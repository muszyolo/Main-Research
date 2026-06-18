import os
import fitz
import json
import time
import re
import urllib.request
import urllib.parse
import urllib.error
import hashlib

# =============================================
# CONFIGURATION
# =============================================
base_dir = r"C:\Users\HP\Desktop\Main Research\Research Proposal\LR Matrix"
output_js = os.path.join(base_dir, "auto_abstracts_v2.js")

def make_stable_id(db_folder, filename):
    """Generate a stable, deterministic ID from folder + filename.
    This ID never changes between script re-runs, so localStorage decisions
    (edited, discarded) and manual overrides are always preserved."""
    raw = f"{db_folder}::{filename}".lower().strip()
    return "abs-" + hashlib.md5(raw.encode()).hexdigest()[:16]

# Dynamically detect database folders (excluding blacklist)
blacklist = ["assets", "node_modules", ".git", ".idea", "__pycache__"]
database_folders = []
for entry in os.listdir(base_dir):
    full_path = os.path.join(base_dir, entry)
    if os.path.isdir(full_path) and entry not in blacklist and not entry.startswith('.'):
        database_folders.append(entry)

# =============================================
# HELPER: CLEAN FILENAME TO SEARCH QUERY
# =============================================
def filename_to_query(filename):
    """Convert PDF filename into a clean title search query."""
    name = filename.replace('.pdf', '').replace('-', ' ').replace('_', ' ')
    # Remove common noise like author names at the start if pattern looks like "Smith2024 Title"
    name = re.sub(r'^[A-Z][a-z]+ ?\d{4} ', '', name)
    return name.strip()

# =============================================
# HELPER: OPENALEX API LOOKUP
# =============================================
def fetch_from_openalex(title_query):
    """
    Query OpenAlex API for a paper matching the title.
    Returns dict with abstract and keywords, or None.
    """
    try:
        encoded = urllib.parse.quote(title_query)
        url = f"https://api.openalex.org/works?search={encoded}&per-page=1&select=title,abstract_inverted_index,keywords,publication_year,primary_location"
        req = urllib.request.Request(url, headers={
            'User-Agent': 'LRShieldDashboard/1.0 (mailto:researcher@example.com)'
        })
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            
        if not data.get('results'):
            return None
            
        result = data['results'][0]
        
        # Reconstruct abstract from inverted index format (OpenAlex-specific)
        abstract = ""
        inv_index = result.get('abstract_inverted_index')
        if inv_index:
            # inv_index = {"word": [position1, position2, ...], ...}
            word_positions = []
            for word, positions in inv_index.items():
                for pos in positions:
                    word_positions.append((pos, word))
            word_positions.sort(key=lambda x: x[0])
            abstract = " ".join(w for _, w in word_positions)
        
        # Keywords
        keywords = []
        kw_list = result.get('keywords', [])
        if kw_list:
            keywords = [kw.get('display_name', '') for kw in kw_list if kw.get('display_name')]
        
        # Journal
        journal = ""
        loc = result.get('primary_location', {})
        if loc and loc.get('source'):
            journal = loc['source'].get('display_name', '')
        
        # Year
        year = result.get('publication_year', None)
        
        return {
            "abstract": abstract,
            "keywords": keywords,
            "journal": journal,
            "year": year,
            "source": "OpenAlex"
        }
    except Exception as e:
        return None

# =============================================
# HELPER: CROSSREF API FALLBACK
# =============================================
def fetch_from_crossref(title_query):
    """
    Query Crossref API as a fallback for abstract and metadata.
    Returns dict with abstract and keywords, or None.
    """
    try:
        encoded = urllib.parse.quote(title_query)
        url = f"https://api.crossref.org/works?query.title={encoded}&rows=1&select=title,abstract,subject,published"
        req = urllib.request.Request(url, headers={
            'User-Agent': 'LRShieldDashboard/1.0'
        })
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        items = data.get('message', {}).get('items', [])
        if not items:
            return None
            
        item = items[0]
        abstract = item.get('abstract', '')
        # Strip XML tags from abstract (Crossref returns JATS XML)
        abstract = re.sub(r'<[^>]+>', ' ', abstract).strip()
        abstract = re.sub(r'\s+', ' ', abstract)
        
        keywords = item.get('subject', [])  # Crossref uses subject as keywords
        
        year = None
        pub = item.get('published', {})
        if pub.get('date-parts'):
            year = pub['date-parts'][0][0]
        
        return {
            "abstract": abstract,
            "keywords": keywords,
            "journal": "",
            "year": year,
            "source": "Crossref"
        }
    except Exception as e:
        return None

# =============================================
# HELPER: PDF TEXT EXTRACTION
# =============================================
def extract_from_pdf(filepath):
    """
    Extract abstract and keywords directly from PDF text.
    Returns dict or None.
    """
    try:
        doc = fitz.open(filepath)
        full_text = ""
        for page_num in range(min(3, len(doc))):
            full_text += doc.load_page(page_num).get_text("text") + "\n"
        doc.close()

        abstract_text = ""
        keywords = []
        
        # --- ABSTRACT EXTRACTION ---
        abstract_match = re.search(
            r'\babstract\b\s*[:\n\-]*\s*(.*?)(?=\b(?:introduction|keywords|key\s*words|background|1[\.\s]+introduction)\b)',
            full_text, re.IGNORECASE | re.DOTALL
        )
        if abstract_match:
            abstract_text = abstract_match.group(1).strip()
            abstract_text = re.sub(r'\s+', ' ', abstract_text)
            abstract_text = " ".join(abstract_text.split()[:400])
        
        # --- KEYWORDS EXTRACTION (if/else cascade) ---
        # Try 1: "Keywords:" or "Key words:" followed by text until next blank line or section
        kw_match = re.search(
            r'\bkey\s*words?\b\s*[:\-]\s*(.*?)(?=\n\n|\b(?:introduction|1[\.\s]+introduction|background)\b)',
            full_text, re.IGNORECASE | re.DOTALL
        )
        if kw_match:
            kw_raw = kw_match.group(1).strip()
            kw_raw = re.sub(r'\s+', ' ', kw_raw)
            # Split by semicolons, commas, or bullets
            keywords = [k.strip() for k in re.split(r'[;,•·]', kw_raw) if k.strip() and len(k.strip()) < 60]
        else:
            # Try 2: Look for keywords as a separate line
            kw_match2 = re.search(r'\bkey\s*words?\b[^\n]*\n([^\n]{10,200})', full_text, re.IGNORECASE)
            if kw_match2:
                kw_raw = kw_match2.group(1).strip()
                keywords = [k.strip() for k in re.split(r'[;,•·]', kw_raw) if k.strip() and len(k.strip()) < 60]

        if abstract_text or keywords:
            return {"abstract": abstract_text, "keywords": keywords, "source": "PDF"}
    except Exception as e:
        pass
    return None

# =============================================
# MAIN EXTRACTION LOOP
# =============================================
print(f"Scanning {len(database_folders)} Database folders...")
abstracts_data = []
total_processed = 0
found_pdf = 0
found_api = 0
found_none = 0

for db_folder in database_folders:
    db_path = os.path.join(base_dir, db_folder)
    if not os.path.exists(db_path):
        continue
        
    for root, dirs, files in os.walk(db_path):
        for file in files:
            if not file.endswith(".pdf"):
                continue
                
            filepath = os.path.join(root, file)
            title_query = filename_to_query(file)
            
            # Basic metadata from filename and folder
            title = title_query
            year = int(time.strftime("%Y"))
            journal = "Unknown Journal"
            category = "Uncategorized" if (root == db_path or db_folder == "Old Database") else os.path.basename(root)
            lit_type = "White Literature (Academic Journal)"
            abstract_text = ""
            keywords = []
            source_used = "None"
            
            # ---- STEP 1: Try PDF text extraction ----
            pdf_result = extract_from_pdf(filepath)
            if pdf_result and (pdf_result.get("abstract") or pdf_result.get("keywords")):
                abstract_text = pdf_result.get("abstract", "")
                keywords = pdf_result.get("keywords", [])
                source_used = "PDF"
                found_pdf += 1
                print(f"  [PDF] {file}")
            else:
                # ---- STEP 2: Try OpenAlex API ----
                print(f"  [API] Querying OpenAlex for: {title_query[:60]}...")
                api_result = fetch_from_openalex(title_query)
                
                if not api_result or (not api_result.get("abstract") and not api_result.get("keywords")):
                    # ---- STEP 3: Crossref fallback ----
                    api_result = fetch_from_crossref(title_query)
                
                if api_result:
                    abstract_text = api_result.get("abstract", "")
                    keywords = api_result.get("keywords", [])
                    if api_result.get("journal"):
                        journal = api_result["journal"]
                    if api_result.get("year"):
                        year = api_result["year"]
                    source_used = api_result.get("source", "API")
                    if abstract_text or keywords:
                        found_api += 1
                    else:
                        found_none += 1
                else:
                    found_none += 1
                
                lit_type = "White Literature (Academic Journal)"
            if abstract_text:
                lower_abs = abstract_text.lower()
                if re.search(r'\b(world health organization|w\.h\.o\.)\b', lower_abs):
                    lit_type = "Grey Literature (World Health Organization)"
                elif re.search(r'\b(national autism society of malaysia|nasom)\b', lower_abs):
                    lit_type = "Grey Literature (NASOM)"
                elif re.search(r'\b(national autism resource centre|narc)\b', lower_abs):
                    lit_type = "Grey Literature (NARC)"
                elif re.search(r'\b(kizzu kids)\b', lower_abs):
                    lit_type = "Grey Literature (Kizzu Kids)"
                elif re.search(r'\b(national health and morbidity survey|nhms)\b', lower_abs):
                    lit_type = "Grey Literature (NHMS)"
                elif db_folder == "Old Database":
                    lit_type = "Grey Literature (Other Report / News)"

            if category == "Uncategorized" and abstract_text:
                lower_abs = abstract_text.lower()
                if re.search(r'\b(cluster|clustering)\b', lower_abs):
                    if re.search(r'\b(machine learning|neural network|svm|deep learning|random forest|decision tree)\b', lower_abs):
                        category = "Clustering (Machine Learning)"
                    else:
                        category = "Clustering (Statistics)"
                elif re.search(r'\b(caregiver|parents of children with autism)\b', lower_abs):
                    category = "Autism Caregiver"
                elif re.search(r'\b(virtual counseling|telehealth|online counseling|tele-counseling)\b', lower_abs):
                    category = "Virtual Counseling"
                elif re.search(r'\b(malaysia|malaysian)\b', lower_abs):
                    category = "Malaysian Context"
                elif re.search(r'\b(autism|asd)\b', lower_abs):
                    category = "Autism"
                elif re.search(r'\b(face validity)\b', lower_abs):
                    category = "Face Validity"
                elif re.search(r'\b(content validity)\b', lower_abs):
                    category = "Content Validity"
                else:
                    category = "TPB Help-Seeking"

            
            abstracts_data.append({
                "id": make_stable_id(db_folder, file),
                "filename": file,
                "title": title,
                "journal": journal,
                "year": year,
                "database": db_folder,
                "category": category,
                "litType": lit_type,
                "abstract": abstract_text if abstract_text else "No abstract found — please add manually.",
                "keywords": keywords,
                "source": source_used
            })
            total_processed += 1
            
            # Small delay to be polite to the APIs
            if source_used in ("OpenAlex", "Crossref"):
                time.sleep(0.3)

# Write to JS Bridge File
with open(output_js, "w", encoding="utf-8") as f:
    f.write("window.AUTO_ABSTRACTS = " + json.dumps(abstracts_data, indent=2) + ";\n")
    f.write("console.log('Bridge File: Loaded ' + window.AUTO_ABSTRACTS.length + ' abstracts ready for screening.');\n")

print(f"\n===== RESULTS =====")
print(f"Total PDFs:       {total_processed}")
print(f"Found via PDF:    {found_pdf}")
print(f"Found via API:    {found_api}")
print(f"Not found:        {found_none}")
print(f"\nWrote {total_processed} records to {output_js}")
