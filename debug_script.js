
    document.addEventListener('DOMContentLoaded', () => {
      // Setup Clock
      function updateClock() {
          const now = new Date();
          document.getElementById('global-ticker-clock').textContent = now.toLocaleTimeString('en-US', { hour12: false });
      }
      setInterval(updateClock, 1000);
      updateClock();

      // Populate Tips
      const tipsArray = [
          "Be ruthless with article quality. Exclude any sources from predatory publishers instantly.",
          "Check Web of Science Master Journal List to ensure indexing validity before marking Tier 1.",
          "Use the Search Strategy Logger for every database query so your Chapter 3 is reproducible."
      ];
      
      const tickerContent = document.getElementById('global-ticker-content');
      
      let fullTips = [];
      while (fullTips.length < 12) {
          fullTips = fullTips.concat(tipsArray);
      }
      
      tickerContent.innerHTML = fullTips.map(tip => `
          <div class="ticker-item">
              <span>⚡</span> ${tip}
          </div>
      `).join('');
      tickerContent.style.animationDuration = '';
    });
  </script>

  <!-- Safe non-blocking auto-import loader. Works even if sync_articles.py has not been run yet. -->
  <script>
    (function() {
      var s = document.createElement('script');
      s.src = 'auto_import.js';
      s.async = true;
      s.onerror = function() { /* file doesn't exist yet, silently skip */ };
      s.onload = function() {
        if (window.__addBridgeArticles) {
            window.__addBridgeArticles();
        } else {
            // In case the module script hasn't finished evaluating, try again in 500ms
            setTimeout(function() { if(window.__addBridgeArticles) window.__addBridgeArticles(); }, 500);
        }
      };
      document.body.appendChild(s);
    })();
  
// Gradient Tracking
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});

</script>
  <script src="auto_abstracts.js">

// --- Abstracts Archive Logic ---
let abstractDecisions = JSON.parse(localStorage.getItem('lr_abstract_decisions')) || {};

function saveAbstractDecisions() {
    localStorage.setItem('lr_abstract_decisions', JSON.stringify(abstractDecisions));
}

window.renderAbstracts = function() {
    const container = document.getElementById('abstracts-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!window.AUTO_ABSTRACTS || window.AUTO_ABSTRACTS.length === 0) {
        container.innerHTML = '<p style="color:white; z-index: 20; position:relative;">No pending abstracts found. Run the python extractor first.</p>';
        return;
    }
    
    const searchVal = (document.getElementById('abstract-search')?.value || '').toLowerCase();
    let pendingCount = 0;
    
    window.AUTO_ABSTRACTS.forEach((abs, index) => {
        if (abstractDecisions[abs.id]) return; // Skip if already approved/rejected
        
        // Basic search filtering
        const searchText = (abs.title + " " + abs.journal + " " + abs.abstract).toLowerCase();
        if (searchVal && !searchText.includes(searchVal)) return;
        
        pendingCount++;
        const div = document.createElement('div');
        div.style.padding = '1.5rem';
        div.style.border = '1px solid rgba(255,255,255,0.2)';
        div.style.borderRadius = '8px';
        div.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
        div.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
        
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                <div style="flex: 1; min-width: 300px;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #60a5fa; font-size: 1.1rem;">${abs.title}</h4>
                    <span class="badge" style="background: rgba(255,255,255,0.1); color: #e2e8f0;">${abs.journal}</span>
                    <span class="badge" style="background: rgba(255,255,255,0.1); color: #e2e8f0;">${abs.year}</span>
                    <span class="badge" style="background: rgba(255,255,255,0.1); color: #e2e8f0;">${abs.database}</span>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button type="button" class="btn btn-primary" onclick="approveAbstract('${abs.id}')">Promote to Article</button>
                    <button type="button" class="btn btn-danger" onclick="rejectAbstract('${abs.id}')">Discard</button>
                </div>
            </div>
            <p style="font-size: 0.95rem; line-height: 1.6; color: #f8fafc; margin: 0; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 4px; border-left: 3px solid #60a5fa;">${abs.abstract}</p>
        `;
        container.appendChild(div);
    });
    
    if (pendingCount === 0) {
        container.innerHTML = '<p style="color:white; z-index: 20; position:relative;">All extracted abstracts have been screened or filtered out!</p>';
    }
}

window.approveAbstract = function(id) {
    const abs = window.AUTO_ABSTRACTS.find(a => a.id === id);
    if (!abs) return;
    
    switchPanel('add-article');
    
    const titleEl = document.getElementById('title');
    if(titleEl) titleEl.value = abs.title;
    
    const journalEl = document.getElementById('journal');
    if(journalEl) journalEl.value = abs.journal;
    
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.value = abs.year;
    
    const dbSelect = document.getElementById('database');
    if(dbSelect) {
        for(let i=0; i<dbSelect.options.length; i++) {
            if(dbSelect.options[i].value === abs.database) {
                dbSelect.selectedIndex = i;
                break;
            }
        }
    }
    
    const notesInput = document.getElementById('notes');
    if(notesInput) notesInput.value = `File: ${abs.filename}\n\n--- ABSTRACT ---\n${abs.abstract}`;
    
    abstractDecisions[id] = 'approved';
    saveAbstractDecisions();
    renderAbstracts();
}

window.rejectAbstract = function(id) {
    abstractDecisions[id] = 'rejected';
    saveAbstractDecisions();
    renderAbstracts();
}

// Hook into the panel switching logic to update titles safely
if (!window._abstractsHooked) {
    window._abstractsHooked = true;
    const origSwitch = window.switchPanel;
    window.switchPanel = function(targetId) {
        if(origSwitch) origSwitch(targetId);
        
        if(targetId === 'abstracts-archive') {
            const pt = document.getElementById('page-title');
            const ps = document.getElementById('page-subtitle');
            if(pt) pt.textContent = 'Abstracts Archive';
            if(ps) ps.textContent = 'Screen automatically extracted abstracts and promote them to articles';
            
            renderAbstracts();
        }
    }
}

// Fix nav buttons that might be missing the onclick handler
document.querySelectorAll('.nav-btn').forEach(btn => {
    if(btn.getAttribute('data-target') === 'abstracts-archive') {
        btn.onclick = function() { switchPanel('abstracts-archive'); };
    }
});

