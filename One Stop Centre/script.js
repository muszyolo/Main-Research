document.addEventListener("DOMContentLoaded", () => {
    // KPI Cards Entrance Animation handled by CSS (animate-up)
    
    // Additional floating micro-interactions can be added here if needed.

    // Initialize Chart.js
    const progressChartCanvas = document.getElementById('progressChart');
    if (progressChartCanvas) {
        const ctx = progressChartCanvas.getContext('2d');
        
        // Premium Gradient for the area chart
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.6)'); // Accent Purple
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)'); // Accent Blue fading out

        // Chart Font configuration
        Chart.defaults.font.family = "'Outfit', sans-serif";
        Chart.defaults.color = "#a1a1aa";

        const progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Literature Screened (LR Shield)',
                        data: [12, 19, 45, 80, 150, 250],
                        borderColor: '#8b5cf6', // Purple line
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#050505',
                        pointBorderColor: '#8b5cf6',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Survey Responses (Stats Suite)',
                        data: [0, 0, 0, 50, 120, 200],
                        borderColor: '#38bdf8', // Blue line
                        backgroundColor: 'rgba(56, 189, 248, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#050505',
                        pointBorderColor: '#38bdf8',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Draft Pages (PubJourney)',
                        data: [5, 10, 15, 25, 40, 65],
                        borderColor: '#2dd4bf', // Teal line
                        backgroundColor: 'rgba(45, 212, 191, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#050505',
                        pointBorderColor: '#2dd4bf',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#a1a1aa',
                            font: { family: "'Outfit', sans-serif", size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 15, 20, 0.9)',
                        titleFont: { size: 14, weight: '600' },
                        bodyFont: { size: 14 },
                        padding: 12,
                        cornerRadius: 12,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false,
                            tickLength: 0
                        },
                        ticks: {
                            padding: 15,
                            font: { size: 12, weight: '500' }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 12, weight: '500' }
                        }
                    }
                },
                animation: {
                    y: {
                        duration: 2000,
                        easing: 'easeOutElastic'
                    }
                }
            }
        });
    }

    // Theme Toggle Logic
    const savedTheme = localStorage.getItem("lr_shield_theme") || "dark";
    const themeIcon = document.getElementById("theme-toggle-icon");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        if (themeIcon) {
            themeIcon.src = "https://fonts.gstatic.com/s/e/notoemoji/latest/2600_fe0f/512.png";
            themeIcon.alt = "Light Mode";
        }
    }
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-theme");
            if (isLight) {
                localStorage.setItem("lr_shield_theme", "light");
                if (themeIcon) themeIcon.src = "https://fonts.gstatic.com/s/e/notoemoji/latest/2600_fe0f/512.png";
            } else {
                localStorage.setItem("lr_shield_theme", "dark");
                if (themeIcon) themeIcon.src = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f319/512.png";
            }
        });
    }
});

// ============================================================
// GLOBAL NEWS TICKER INITIALIZATION
// ============================================================
function initTicker(tipsArray) {
    // Inject Ticker HTML
    const tickerHTML = `
        <div class="news-ticker-container">
            <div class="news-ticker-label">Breaking Tip</div>
            <div class="ticker-clock" id="global-ticker-clock">00:00:00</div>
            <div class="news-ticker-wrap">
                <div class="news-ticker-content" id="global-ticker-content"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', tickerHTML);

    // Setup Clock
    function updateClock() {
        const now = new Date();
        document.getElementById('global-ticker-clock').textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Populate Tips
    const tickerContent = document.getElementById('global-ticker-content');
    if (tickerContent) {
        // PubJourney originally rendered 12 tips (6 unique * 2). 
        // We replicate that total volume so the fixed 150s CSS animation yields the exact same visual speed.
        let fullTips = [];
        while (fullTips.length < 12) {
            fullTips = fullTips.concat(tipsArray);
        }

        tickerContent.innerHTML = fullTips.map(tip => `
            <div class="ticker-item">
                <span>⚡</span> ${tip}
            </div>
        `).join('');

        // Remove dynamic inline duration to fallback to CSS 150s
        tickerContent.style.animationDuration = '';
    }
}

// Gradient Tracking
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});


// Dynamic KPI Calculation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            if (typeof MASTER_REFERENCES !== 'undefined') {
                const papersCount = MASTER_REFERENCES.length;
                const papersEl = document.getElementById('count-papers-reviewed');
                if (papersEl) {
                    animateValue(papersEl, 0, papersCount, 1500);
                }
                
                const autismCount = MASTER_REFERENCES.filter(r => 
                    (r.title && r.title.toLowerCase().includes('autism')) || 
                    (r.title && r.title.toLowerCase().includes('asd')) ||
                    (r.abstract && r.abstract.toLowerCase().includes('autism'))
                ).length;
                const autismEl = document.getElementById('count-autism-studies');
                if (autismEl) {
                    animateValue(autismEl, 0, autismCount, 1500);
                }
            }
        } catch (e) {
            console.error('Could not calculate dynamic KPIs', e);
        }
    }, 500);
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
