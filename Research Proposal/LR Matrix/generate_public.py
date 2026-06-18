"""
Generate public.html from index.html
- Adds a read-only public view banner
- Disables: Edit, Delete, Export CSV, Export/Import Backup, Download Mindmap, Quick Backup, Clear DB
- Greyed out with tooltip 'Not available in public view'
- index.html stays 100% untouched
"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

TOOLTIP = 'title="Not available in public view"'
DISABLED_STYLE = 'style="opacity:0.35;cursor:not-allowed;pointer-events:none;" title="Not available in public view" disabled'

# ─────────────────────────────────────────────
# 1. Disable the quick-backup button in the sidebar
# ─────────────────────────────────────────────
content = content.replace(
    '<button class="btn btn-secondary btn-sm" id="btn-quick-backup">',
    f'<button class="btn btn-secondary btn-sm" id="btn-quick-backup" {DISABLED_STYLE}>'
)

# ─────────────────────────────────────────────
# 2. Disable Export CSV Matrix button
# ─────────────────────────────────────────────
content = content.replace(
    '<button class="btn btn-success" id="btn-export-csv">',
    f'<button class="btn btn-success" id="btn-export-csv" {DISABLED_STYLE}>'
)

# ─────────────────────────────────────────────
# 3. Disable Export Complete Backup (JSON) button
# ─────────────────────────────────────────────
content = content.replace(
    '<button class="btn btn-primary" id="btn-export-backup">',
    f'<button class="btn btn-primary" id="btn-export-backup" {DISABLED_STYLE}>'
)

# ─────────────────────────────────────────────
# 4. Disable Upload & Restore JSON button
# ─────────────────────────────────────────────
content = content.replace(
    'onclick="document.getElementById(\'import-backup-file\').click()">',
    f'{DISABLED_STYLE}>'
)

# ─────────────────────────────────────────────
# 5. Disable Download Mind Map button
# ─────────────────────────────────────────────
content = content.replace(
    '<button type="button" class="btn btn-primary" id="btn-download-mindmap" onclick="downloadAbstractMindmap()"',
    f'<button type="button" class="btn btn-primary" id="btn-download-mindmap" {DISABLED_STYLE}'
)

# ─────────────────────────────────────────────
# 6. Disable findEditedAbstracts (View Edited) button
# ─────────────────────────────────────────────
content = content.replace(
    '<button type="button" class="btn btn-primary" onclick="findEditedAbstracts()" aria-label="View edited abstracts">',
    f'<button type="button" class="btn btn-primary" onclick="findEditedAbstracts()" aria-label="View edited abstracts" {DISABLED_STYLE}>'
)

# ─────────────────────────────────────────────
# 7. Disable exportAbstractsCSV (Export CSV from abstracts) button
# ─────────────────────────────────────────────
content = content.replace(
    '<button type="button" class="btn btn-primary" onclick="exportAbstractsCSV()" aria-label="Export abstracts as CSV file">',
    f'<button type="button" class="btn btn-primary" onclick="exportAbstractsCSV()" aria-label="Export abstracts as CSV file" {DISABLED_STYLE}>'
)

# ─────────────────────────────────────────────
# 8. Disable Edit and Delete buttons in the article table (JS-generated)
#    These are generated in the v() render function as action-link edit/delete
#    We inject them as disabled via CSS override in the public banner block
# ─────────────────────────────────────────────
# Replace the edit/delete button templates inside the v() function render string
content = content.replace(
    '<button class=\\"action-link edit\\" data-id=\\"${r.id}\\">Edit</button>',
    '<button class=\\"action-link edit\\" data-id=\\"${r.id}\\" disabled style=\\"opacity:0.35;cursor:not-allowed;pointer-events:none;\\" title=\\"Not available in public view\\">Edit</button>'
)
content = content.replace(
    '<button class=\\"action-link delete\\" data-id=\\"${r.id}\\">Delete</button>',
    '<button class=\\"action-link delete\\" data-id=\\"${r.id}\\" disabled style=\\"opacity:0.35;cursor:not-allowed;pointer-events:none;\\" title=\\"Not available in public view\\">Delete</button>'
)

# Try single-quote variants too
content = content.replace(
    "<button class=\"action-link edit\" data-id=\"${r.id}\">Edit</button>",
    "<button class=\"action-link edit\" data-id=\"${r.id}\" disabled style=\"opacity:0.35;cursor:not-allowed;pointer-events:none;\" title=\"Not available in public view\">Edit</button>"
)
content = content.replace(
    "<button class=\"action-link delete\" data-id=\"${r.id}\">Delete</button>",
    "<button class=\"action-link delete\" data-id=\"${r.id}\" disabled style=\"opacity:0.35;cursor:not-allowed;pointer-events:none;\" title=\"Not available in public view\">Delete</button>"
)

# ─────────────────────────────────────────────
# 9. Disable the Clear Database button (danger)
# ─────────────────────────────────────────────
content = content.replace(
    'id="btn-clear-db"',
    f'id="btn-clear-db" {DISABLED_STYLE}'
)

# ─────────────────────────────────────────────
# 10. Inject the public-mode CSS + banner after <body>
# ─────────────────────────────────────────────
PUBLIC_BANNER = """
<style>
  #public-banner {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 9999;
    background: linear-gradient(90deg, #1e3a5f 0%, #0f2340 100%);
    border-bottom: 1px solid rgba(96, 165, 250, 0.4);
    padding: 8px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12.5px;
    font-family: 'Inter', sans-serif;
    color: #93c5fd;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
  }
  #public-banner .banner-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  #public-banner .banner-icon {
    font-size: 16px;
  }
  #public-banner strong {
    color: #bfdbfe;
    font-weight: 700;
  }
  #public-banner .banner-right {
    font-size: 11px;
    color: #60a5fa;
    opacity: 0.75;
  }
  /* Push page content down so banner doesn't overlap sidebar */
  body.has-public-banner .sidebar {
    top: 35px;
    height: calc(100vh - 35px);
  }
  body.has-public-banner .main-content {
    padding-top: calc(24px + 35px);
  }
  /* Make disabled buttons visibly greyed */
  button[disabled], button[disabled]:hover {
    opacity: 0.35 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
    transform: none !important;
  }
  /* Disable article add/edit form completely */
  #article-form-section {
    opacity: 0.3;
    pointer-events: none;
    position: relative;
  }
  #article-form-section::after {
    content: 'Article submission disabled in public view';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(15,35,64,0.9);
    color: #93c5fd;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 13px;
    border: 1px solid rgba(96,165,250,0.3);
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;
  }
  /* Disable search log form */
  #search-log-form {
    opacity: 0.3;
    pointer-events: none;
  }
</style>

<div id="public-banner">
  <div class="banner-left">
    <span class="banner-icon">&#128275;</span>
    <span><strong>Read-only public view</strong> &mdash; Some features are disabled. Filters, search, and visualisations are fully interactive.</span>
  </div>
  <div class="banner-right">&#128203; LR Shield &bull; Master by Research</div>
</div>
<script>document.body.classList.add('has-public-banner');</script>
"""

content = content.replace('<body>', '<body>\n' + PUBLIC_BANNER)

# ─────────────────────────────────────────────
# 11. Update the <title> tag to indicate public version
# ─────────────────────────────────────────────
content = content.replace(
    '<title>LR Shield',
    '<title>[Public] LR Shield'
)


import os
import shutil

# Ensure docs directory exists at the root of the repository
docs_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'docs'))
os.makedirs(docs_dir, exist_ok=True)

# ─────────────────────────────────────────────
# Write output to docs/index.html
# ─────────────────────────────────────────────
out_html = os.path.join(docs_dir, 'index.html')
with open(out_html, 'w', encoding='utf-8') as f:
    f.write(content)

# ─────────────────────────────────────────────
# Copy dependency JS files
# ─────────────────────────────────────────────
shutil.copy('auto_import.js', os.path.join(docs_dir, 'auto_import.js'))
shutil.copy('auto_abstracts_v2.js', os.path.join(docs_dir, 'auto_abstracts_v2.js'))

print("✅ docs/index.html generated successfully.")
print("   - index.html is untouched.")
print("   - JS dependencies copied to docs/.")
