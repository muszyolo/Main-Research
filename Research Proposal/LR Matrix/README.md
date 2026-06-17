# LR Shield — Systematic Literature Review Dashboard

> A locally-hosted AI-assisted dashboard for automating the Systematic Literature Review (SLR) process, built for the Master by Research (Educational Technology) program at UiTM.

---

## 🧩 What is This?

**LR Shield** is a fully-featured, offline-first SLR management dashboard built with pure HTML, CSS, and JavaScript — no server required. It is backed by a Python automation engine that recursively scans your PDF folders, extracts metadata, deduplicates records, and injects the results directly into the dashboard.

---

## ✨ Features

- 📁 **Auto PDF Ingestion** — Python script (`sync_articles.py`) scans all database folders and extracts article metadata
- 🔁 **Deterministic Deduplication** — MD5-hash-based IDs ensure zero duplicate records across sessions
- 🚩 **Predatory Journal Detection** — Auto-flags known predatory journals before inclusion
- 📊 **PRISMA Progress Tracker** — Battery gauges and bars for real-time Tier 1–4 screening progress
- 🧠 **Abstract Archive & Mindmap** — Visual concept clustering of article abstracts
- 📈 **Coverage Analytics** — Charts showing distribution across Scopus, WoS, PubMed, Springer, IEEE
- 🌙 **Dark / Light Mode** — Full theme toggle support

---

## 📂 Project Structure

```
LR Matrix/
│
├── index.html                  # Main dashboard application
├── sync_articles.py            # PDF scanner & auto_import.js generator
├── extract_abstracts.py        # Abstract extractor script
├── sync.bat                    # Windows batch script to run sync_articles.py
├── assets/                     # Icons, logos, and static assets
├── shield_logo.svg             # LR Shield logo
├── uitm_logo.svg               # UiTM logo
│
├── literature_references_plan.md
└── research_planning_guide.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/lr-shield.git
cd lr-shield
```

### 2. Add Your PDFs
Place your downloaded PDFs into their respective database folders:
```
Scopus/
PubMed/
Springer Nature/
Web of Science/
Google Scholar/
```

### 3. Install Python Dependencies
```bash
pip install PyMuPDF requests
```

### 4. Run the Sync Script
```bash
python sync_articles.py
```
This generates `auto_import.js` which the dashboard reads automatically.

### 5. Open the Dashboard
Simply open `index.html` in your browser — no server required!

---

## 🔬 Research Context

This tool was built to support a Master by Research thesis on:

> **"Profiling Caregiver Readiness for Autism Transition: Integrating the Theory of Planned Behavior with Latent Cluster Analysis"**

It implements the full PRISMA flow: Identification → Screening → Eligibility → Inclusion.

---

## 📜 License

MIT License — Feel free to adapt for your own SLR projects.
