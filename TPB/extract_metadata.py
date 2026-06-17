import fitz
import os

pdf_dir = "."
files = [f for f in os.listdir(pdf_dir) if f.endswith(".pdf")]

for file in files:
    print(f"\n--- File: {file} ---")
    try:
        doc = fitz.open(file)
        page = doc.load_page(0)
        text = page.get_text("text")
        lines = text.split('\n')
        # Print first 10 non-empty lines for context
        clean_lines = [l.strip() for l in lines if l.strip()]
        for i, line in enumerate(clean_lines[:15]):
            print(f"[{i}] {line}")
    except Exception as e:
        print(f"Error reading file: {e}")
