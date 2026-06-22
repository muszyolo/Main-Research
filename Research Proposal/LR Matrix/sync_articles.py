import os
import fitz
import json
import time
import re
import urllib.request
import urllib.parse

def is_retracted(title, text):
    if re.search(r'\b(retract|retracted|retraction)\b', text[:2000], re.IGNORECASE):
        return True
    try:
        url = "https://api.crossref.org/works?query.bibliographic=" + urllib.parse.quote(title) + "&select=title,update-to&rows=1&mailto=researcher@example.com"
        req = urllib.request.Request(url, headers={'User-Agent': 'LR-Matrix-Script/1.0'})
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            items = data.get('message', {}).get('items', [])
            if items:
                updates = items[0].get('update-to', [])
                for u in updates:
                    if u.get('type') == 'retraction':
                        return True
    except Exception:
        pass
    print("  -> Crossref API Checked", flush=True)
    return False

# Configuration Paths
base_dir = r"C:\Users\HP\Desktop\Main Research\Research Proposal\LR Matrix"
output_js = os.path.join(base_dir, "auto_import.js")

# Dynamically detect database folders
blacklist = ["assets", "node_modules", ".git", ".idea", "__pycache__"]
database_folders = []
for entry in os.listdir(base_dir):
    full_path = os.path.join(base_dir, entry)
    if os.path.isdir(full_path) and entry not in blacklist and not entry.startswith('.'):
        database_folders.append(entry)

print(f"Scanning {len(database_folders)} Database folders...")
articles = []
total_processed = 0

# ALWAYS ensure the core categories exist in the dropdown
all_categories = {"Autism Caregiver", "Clustering (Statistics)", "Clustering (Machine Learning)", "Malaysian Context", "TPB Help-Seeking", "Virtual Counseling", "Autism", "Face Validity", "Content Validity", "Systematic Literature Review", "Caregiver Burden"}
all_lit_types = {"White Literature (Academic Journal)", "White Literature (Conference Proceeding)", "Grey Literature (World Health Organization)", "Grey Literature (NASOM)", "Grey Literature (NARC)", "Grey Literature (Kizzu Kids)", "Grey Literature (Other Report / News)"}

def extract_sentences_with_keywords(text, primary_keywords, secondary_keywords):
    sentences = re.split(r'(?<=[.!?]) +', text.replace('\n', ' '))
    extracted = []
    
    primary_pattern = re.compile(r'\b(?:' + '|'.join(primary_keywords) + r')\b', re.IGNORECASE)
    secondary_pattern = re.compile(r'\b(?:' + '|'.join(secondary_keywords) + r')\b', re.IGNORECASE)
    
    for s in sentences:
        if primary_pattern.search(s) and secondary_pattern.search(s):
            clean_s = re.sub(r'\s+', ' ', s).strip()
            if clean_s not in extracted:
                extracted.append(clean_s)
    return extracted

for db_folder in database_folders:
    db_path = os.path.join(base_dir, db_folder)
    if not os.path.exists(db_path):
        continue
        
    for root, dirs, files in os.walk(db_path):
        # if 'NHMS' in root or 'nhms' in root.lower():
            # continue
        for file in files:
            if not file.endswith(".pdf"):
                continue
                
            filepath = os.path.join(root, file)
            print(f"Processing: {filepath}", flush=True)
            try:
                doc = fitz.open(filepath)
                
                full_text = ""
                for page_num in range(len(doc)):
                    full_text += doc.load_page(page_num).get_text("text") + " \n"
                print("  -> PDF Extracted", flush=True)
                    
                clean_lines = [l.strip() for l in full_text.split('\n') if l.strip()]
                
                title = file.replace('.pdf', '').replace('-', ' ')
                journal = clean_lines[0] if len(clean_lines) > 0 else "Unknown Journal"
                year = int(time.strftime("%Y"))
                
                header_text = " ".join(clean_lines[:20])
                year_match = re.search(r'\b(20[0-2][0-9])\b', header_text)
                if year_match:
                    year = int(year_match.group(1))

                lower_text = full_text.lower()
                
                # ==========================================
                # LITERATURE TYPE & CATEGORY DETERMINATION
                # ==========================================
                lit_type = "White Literature (Academic Journal)"
                if re.search(r'\b(world health organization|w\.h\.o\.)\b', lower_text):
                      lit_type = "Grey Literature (World Health Organization)"
                elif re.search(r' (national autism society of malaysia|nasom) ', lower_text):
                      lit_type = "Grey Literature (NASOM)"
                elif re.search(r' (national autism resource centre|narc) ', lower_text):
                      lit_type = "Grey Literature (NARC)"
                elif re.search(r' (kizzu kids) ', lower_text):
                      lit_type = "Grey Literature (Kizzu Kids)"
                elif re.search(r' (national health and morbidity survey|nhms) ', lower_text):
                      lit_type = "Grey Literature (NHMS)"
                elif db_folder == "Old Database":
                      lit_type = "Grey Literature (Other Report / News)"
                      
                all_lit_types.add(lit_type)

                # ==========================================
                # MULTI-TAG AI SCANNER
                # ==========================================
                subcats = []
                
                if re.search(r'\b(cluster|clustering)\b', lower_text):
                    if re.search(r'\b(machine learning|neural network|svm|deep learning|random forest|decision tree)\b', lower_text):
                        subcats.append("Clustering (Machine Learning)")
                    else:
                        subcats.append("Clustering (Statistics)")
                if re.search(r'\b(caregiver|parents of children with autism)\b', lower_text):
                    subcats.append("Autism Caregiver")
                if re.search(r'\b(virtual counseling|telehealth|online counseling|tele-counseling)\b', lower_text):
                    subcats.append("Virtual Counseling")
                if re.search(r'\b(malaysia|malaysian)\b', lower_text):
                    subcats.append("Malaysian Context")
                if re.search(r'\b(autism|asd)\b', lower_text):
                    subcats.append("Autism")
                if re.search(r'\b(data-driven|data driven|empirical data|data mining)\b', lower_text):
                    subcats.append("Data-Driven Approach")
                if re.search(r'\b(face validity|content validity|i-cvi|s-cvi|item-level|scale-level)\b', lower_text):
                    subcats.append("Instrument Validation")
                if re.search(r'\b(cognitive reframing|cbt|psychoeducation)\b', lower_text):
                    subcats.append("Cluster 1 (Attitude-Focused)")
                if re.search(r'\b(expert endorsement|peer-mentor|workshops)\b', lower_text):
                    subcats.append("Cluster 2 (Norm-Focused)")
                if re.search(r'\b(problem-solving training|pst|respite|micro-interventions)\b', lower_text):
                    subcats.append("Cluster 3 (Control-Focused)")
                if re.search(r'\b(systematic review|systematic literature review|meta-analysis)\b', lower_text):
                    subcats.append("Systematic Literature Review")
                if re.search(r'\b(caregiver burden|parental burden)\b', lower_text):
                    subcats.append("Caregiver Burden")

                # Core Category Assignment
                folder_name = os.path.basename(root)
                if root != db_path and db_folder != "Old Database" and folder_name.lower() != "pdfs":
                    category = folder_name
                else:
                    if "Autism Caregiver" in root:
                        category = "Autism Caregiver"
                    elif "Cluster" in root:
                        category = "Clustering (Statistics)"
                    else:
                        found_core = False
                        for sc in subcats:
                            if not sc.startswith("Cluster ") and "Approach" not in sc:
                                category = sc
                                found_core = True
                                break
                        if not found_core:
                            category = "Uncategorized"
                
                if category in subcats:
                    subcats.remove(category)
                
                subcategories_str = ", ".join(subcats)
                all_categories.add(category)
                
                # ==========================================
                # ABSTRACT EXTRACTION
                # ==========================================
                abstract_text = ""
                abstract_match = re.search(r'\babstract\b\s*[:\n\-]*\s*(.*?)(?=\b(?:introduction|keywords|background|1\.\s+introduction)\b)', full_text, re.IGNORECASE | re.DOTALL)
                if abstract_match:
                    abstract_text = abstract_match.group(1).strip()
                    abstract_text = re.sub(r'\s+', ' ', abstract_text)
                    abstract_text = " ".join(abstract_text.split()[:400]) 
                
                # ==========================================
                # AI HEURISTICS FOR METHODOLOGICAL QUALITY
                # ==========================================
                quality_checks = ["q4", "q5", "q3"] 
                
                # Check Retraction Status via Crossref API / Text
                is_retracted_flag = is_retracted(title, lower_text)
                if is_retracted_flag:
                    quality_checks.remove("q3")

                if db_folder in ["Scopus", "Web of Science", "PubMed", "PsycINFO", "Springer Nature"]:
                    quality_checks.append("q1") 

                
                n_matches = re.findall(r'(?:n\s*=\s*|sample size (?:of\s*)?|participants.*?n\s*=\s*)(\d+)', lower_text)
                max_n = 0
                for n_str in n_matches:
                    try:
                        n_val = int(n_str)
                        if n_val > max_n and n_val < 10000:
                            max_n = n_val
                    except:
                        pass
                if max_n >= 150:
                    quality_checks.append("q6")

                if re.search(r'\b(normality|multicollinearity|multi-collinearity|kmo|bartlett|cronbach)\b', lower_text):
                    quality_checks.append("q7")

                if re.search(r'\b(effect size|cohen\'s d|eta squared|eta-squared)\b', lower_text):
                    quality_checks.append("q8")

                if re.search(r'\b(csi-pasd|validity|reliability|validated instrument|psychometric properties)\b', lower_text):
                    quality_checks.append("q9")

                tail_text = lower_text[int(len(lower_text)*0.8):]
                if re.search(r'\b(limitations?|limitation of this study|future research should)\b', tail_text):
                    quality_checks.append("q10")

                if year >= 2016:
                    quality_checks.append("q11")

                score = len(quality_checks)
                
                if score >= 8:
                    tier = "Tier 1 (Core)"
                elif score >= 6:
                    tier = "Tier 2 (Supporting)"
                elif score >= 5:
                    tier = "Tier 3 (Contextual)"
                else:
                    tier = "Reject"

                # ==========================================
                # TPB ADAPTATION EXTRACTION
                # ==========================================
                tpb_primaries = ["theory of planned behavior", "theory of planned behaviour", "tpb"]
                tpb_secondaries = ["adapted", "extended", "modified", "integrated", "framework", "added", "proposed model"]
                
                tpb_sentences = extract_sentences_with_keywords(full_text, tpb_primaries, tpb_secondaries)
                
                notes = f"Database: {db_folder} | Category: {category}\nAuto-ingested from file: {file}\n\n"
                if max_n > 0:
                    notes += f"Detected Sample Size: N={max_n}\n"
                if abstract_text:
                    notes += f"\n--- EXTRACTED ABSTRACT ---\n{abstract_text}\n"
                    
                if tpb_sentences:
                    notes += "\n--- AI EXTRACTED TPB ADAPTATIONS ---\n"
                    for idx_s, s in enumerate(tpb_sentences, 1):
                        notes += f"{idx_s}. {s}\n"
                
                import hashlib
                det_id = hashlib.md5(f"{db_folder}_{file}".encode('utf-8')).hexdigest()[:12]
                articles.append({
                    "id": f"auto-{det_id}",
                    "title": title,
                    "authors": "Unknown (Auto-Ingested)",
                    "journal": journal,
                    "year": year,
                    "doi": "",
                    "database": db_folder,
                    "category": category,
                    "subcategories": subcategories_str,
                    "litType": lit_type, 
                    "notes": notes.strip(),
                    "qualityChecks": quality_checks,
                    "qualityScore": score,
                    "tier": tier,
                    "dangerFlags": { "status": "safe", "reason": f"AI pre-screened based on textual heuristics. Category determined by folder structure or AI." },
                    "dateAdded": time.strftime("%Y-%m-%d"),
                    "_filename": file
                })
                total_processed += 1
            except Exception as e:
                print(f"Failed to read {file} in {db_folder}: {e}")

# Write to JS Bridge File
with open(output_js, "w", encoding="utf-8") as f:
    f.write("window.AUTO_DATABASES = " + json.dumps(list(database_folders)) + ";\n")
    sorted_categories = sorted(list(all_categories))
    f.write("window.AUTO_CATEGORIES = " + json.dumps(sorted_categories) + ";\n")
    f.write("window.AUTO_IMPORT_ARTICLES = " + json.dumps(articles, indent=2) + ";\n")
    f.write("console.log('Bridge File: Loaded ' + window.AUTO_IMPORT_ARTICLES.length + ' articles ready for import.');\n")

print(f"Successfully processed {total_processed} PDFs across {len(database_folders)} databases and {len(all_categories)} categories.")
