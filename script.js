
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
  