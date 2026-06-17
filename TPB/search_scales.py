import fitz
import os
import re

pdf_dir = "."
files = [f for f in os.listdir(pdf_dir) if f.endswith(".pdf")]

keywords = ["likert", "point scale", "-point", "5-point", "7-point", "measurement"]

for file in files:
    print(f"\n--- Checking: {file} ---")
    try:
        doc = fitz.open(file)
        found = False
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text()
            # Split into sentences or lines
            sentences = re.split(r'(?<=[.!?]) +', text.replace('\n', ' '))
            
            for sentence in sentences:
                if any(kw.lower() in sentence.lower() for kw in keywords):
                    if "scale" in sentence.lower() or "likert" in sentence.lower() or "-point" in sentence.lower():
                        print(f"[Page {page_num+1}] {sentence.strip()}")
                        found = True
        if not found:
            print("No scale-related keywords found.")
    except Exception as e:
        print(f"Error reading file: {e}")
