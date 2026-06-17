import fitz
import os
import re

pdf_dir = "."
files = [f for f in os.listdir(pdf_dir) if f.endswith(".pdf")]

# Keywords related to adaptation/extension of TPB
adapt_keywords = ["adapt", "extend", "modify", "integrate", "addition", "expand"]
tpb_keywords = ["tpb", "theory of planned behav", "construct"]

for file in files:
    print(f"\n--- Checking: {file} ---")
    try:
        doc = fitz.open(file)
        found_sentences = []
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text()
            # Split into sentences
            sentences = re.split(r'(?<=[.!?]) +', text.replace('\n', ' '))
            
            for sentence in sentences:
                s_lower = sentence.lower()
                # Check if it mentions TPB AND an adaptation keyword
                if any(t_kw in s_lower for t_kw in tpb_keywords) and any(a_kw in s_lower for a_kw in adapt_keywords):
                    found_sentences.append(f"[Page {page_num+1}] {sentence.strip()}")
        
        # Deduplicate and print
        unique_sentences = list(set(found_sentences))
        for s in unique_sentences[:5]: # Print up to 5 examples per paper
            print(s)
            
        if not unique_sentences:
            print("No explicit mentions of adapting/extending TPB found.")
            
    except Exception as e:
        print(f"Error reading file: {e}")
