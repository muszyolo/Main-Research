import fitz
import os
import re

pdf_dir = "."
files = [f for f in os.listdir(pdf_dir) if f.endswith(".pdf")]

for file in files:
    print(f"\n--- File: {file} ---")
    try:
        doc = fitz.open(file)
        # Check first 2 pages for abstract
        abstract_text = ""
        for i in range(min(2, len(doc))):
            page = doc.load_page(i)
            text = page.get_text("text")
            
            # Simple regex to find abstract block, using IGNORECASE flag
            match = re.search(r'abstract[\s\n:-]+(.*?)(keywords|introduction|1\. introduction)', text, flags=re.IGNORECASE | re.DOTALL)
            if match:
                abstract_text = match.group(1).replace('\n', ' ').strip()
                break
                
        if abstract_text:
            # Print first 800 characters of abstract to get the gist
            print(f"ABSTRACT: {abstract_text[:800]}...")
        else:
            print("Abstract not easily found. Pulling first 800 chars of document.")
            page = doc.load_page(0)
            print(f"TEXT: {page.get_text('text').replace(chr(10), ' ')[:800]}...")
            
    except Exception as e:
        print(f"Error reading file: {e}")
