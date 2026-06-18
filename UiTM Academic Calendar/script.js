document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedMode = 'all'; // all, coursework, research
    let selectedDateStr = null;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const grid = document.getElementById("calendar-grid");
    const monthYearTitle = document.getElementById("current-month-year");
    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");
    const toggleBtns = document.querySelectorAll(".toggle-btn");

    const sidebarTitle = document.getElementById("sidebar-date-title");
    const sidebarEvents = document.getElementById("sidebar-events-list");

    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Initialize Theme
    const savedTheme = localStorage.getItem("lr_shield_theme") || "dark";
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        document.documentElement.setAttribute("data-theme", "light");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        }
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-theme");
            if (isLight) {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("lr_shield_theme", "light");
                themeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
            } else {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("lr_shield_theme", "dark");
                themeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
            }
        });
    }

    function renderCalendar() {
        grid.innerHTML = "";
        monthYearTitle.innerText = `${monthNames[currentMonth]} ${currentYear}`;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Empty slots before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.className = "day empty";
            grid.appendChild(emptyDiv);
        }

        // Render days
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayDiv = document.createElement("div");
            dayDiv.className = "day";
            if (dateStr === selectedDateStr) {
                dayDiv.classList.add("active");
            }
            
            // Highlight actual today
            const realToday = new Date();
            if(realToday.getFullYear() === currentYear && realToday.getMonth() === currentMonth && realToday.getDate() === i){
                 dayDiv.classList.add("today");
            }

            const numSpan = document.createElement("div");
            numSpan.className = "day-num";
            numSpan.innerText = i;
            dayDiv.appendChild(numSpan);

            // Fetch events for this day based on mode
            const dayEvents = getEventsForDate(dateStr);
            if (dayEvents.length > 0) {
                const indicatorsDiv = document.createElement("div");
                indicatorsDiv.className = "event-indicators";
                
                // Track drawn categories to avoid duplicate dots of same color
                const drawnCats = new Set();
                dayEvents.forEach(evt => {
                    if (evt.category === 'holiday') {
                        dayDiv.classList.add('is-holiday');
                    }
                    if(!drawnCats.has(evt.category)) {
                        const dot = document.createElement("div");
                        dot.className = `indicator cat-${evt.category}`;
                        indicatorsDiv.appendChild(dot);
                        drawnCats.add(evt.category);
                    }
                });
                dayDiv.appendChild(indicatorsDiv);
            }

            dayDiv.addEventListener("click", () => {
                document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
                dayDiv.classList.add("active");
                selectedDateStr = dateStr;
                showEventsInSidebar(dateStr, i, dayEvents);
            });

            grid.appendChild(dayDiv);
        }
    }

    function getEventsForDate(dateStr) {
        const targetDate = new Date(dateStr);
        return academicEvents.filter(evt => {
            const start = new Date(evt.start);
            const end = new Date(evt.end);
            const isDateInRange = targetDate >= start && targetDate <= end;
            
            if (!isDateInRange) return false;
            
            // Filter by mode
            if (selectedMode === 'all') return true;
            return evt.modes.includes(selectedMode);
        });
    }

    function showEventsInSidebar(dateStr, dayNum, dayEvents) {
        const dateObj = new Date(dateStr);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        sidebarTitle.innerText = dateObj.toLocaleDateString(undefined, options);
        sidebarEvents.innerHTML = "";

        if (dayEvents.length === 0) {
            sidebarEvents.innerHTML = `<p class="placeholder-text">No scheduled events for this date in the selected mode.</p>`;
            return;
        }

        dayEvents.forEach(evt => {
            const card = document.createElement("div");
            card.className = "event-card";
            card.style.borderLeftColor = `var(--cat-${evt.category})`;
            
            let dateText = evt.start === evt.end 
                ? evt.start 
                : `${evt.start} to ${evt.end}`;

            let badgesHtml = evt.modes.map(m => `<span class="badge">${m}</span>`).join('');

            card.innerHTML = `
                <h4>${evt.title}</h4>
                <p>${dateText}</p>
                <div class="badges">${badgesHtml}</div>
            `;
            sidebarEvents.appendChild(card);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    toggleBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            toggleBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            selectedMode = e.target.getAttribute("data-mode");
            
            renderCalendar();
            
            // Re-render sidebar if a date is already selected
            if(selectedDateStr) {
                const dayNum = parseInt(selectedDateStr.split("-")[2]);
                showEventsInSidebar(selectedDateStr, dayNum, getEventsForDate(selectedDateStr));
            }
        });
    });

    // Init
    renderCalendar();
});

// Gradient Tracking
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});
