document.addEventListener("DOMContentLoaded", function() {
    // Generate dates based on today to make the chart always relevant
    const today = new Date();
    
    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().split('T')[0];
    }

    const tasks = [
        {
            id: 'Task 1',
            name: 'Literature Review & Task Design',
            start: addDays(today, -7),
            end: addDays(today, 14),
            progress: 60,
            dependencies: ''
        },
        {
            id: 'Task 2',
            name: 'Ethical Approval (IRB)',
            start: addDays(today, 14),
            end: addDays(today, 45),
            progress: 10,
            dependencies: 'Task 1'
        },
        {
            id: 'Task 3',
            name: 'Participant Recruitment',
            start: addDays(today, 45),
            end: addDays(today, 75),
            progress: 0,
            dependencies: 'Task 2'
        },
        {
            id: 'Task 4',
            name: 'Data Collection (Autism Caregivers)',
            start: addDays(today, 60), // Can start during recruitment
            end: addDays(today, 100),
            progress: 0,
            dependencies: 'Task 3'
        },
        {
            id: 'Task 5',
            name: 'Data Analysis',
            start: addDays(today, 100),
            end: addDays(today, 130),
            progress: 0,
            dependencies: 'Task 4'
        },
        {
            id: 'Task 6',
            name: 'Report Writing & Publication',
            start: addDays(today, 130),
            end: addDays(today, 160),
            progress: 0,
            dependencies: 'Task 5'
        }
    ];

    const gantt = new Gantt("#gantt", tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
        bar_height: 30,
        bar_corner_radius: 6,
        arrow_curve: 5,
        padding: 18,
        view_mode: 'Week',   
        date_format: 'YYYY-MM-DD',
        custom_popup_html: function(task) {
            // custom popup HTML
            const end_date = task._end.toLocaleDateString();
            return `
                <div class="details-container">
                  <div class="heading">${task.name}</div>
                  <div class="description">Progress: ${task.progress}%</div>
                  <div class="description">Expected End: ${end_date}</div>
                </div>
              `;
        }
    });

    // Handle view mode buttons
    document.getElementById('viewModeWeek').addEventListener('click', () => {
        gantt.change_view_mode('Week');
    });

    document.getElementById('viewModeMonth').addEventListener('click', () => {
        gantt.change_view_mode('Month');
    });
});
