// Drag and Drop Logic for Kanban Board
function allowDrop(ev) {
    ev.preventDefault();
    if (ev.target.classList.contains('kanban-column')) {
        ev.target.classList.add('drag-over');
    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.opacity = '0.5';
}

function drop(ev) {
    ev.preventDefault();
    
    // Remove drag-over styling
    document.querySelectorAll('.kanban-column').forEach(col => {
        col.classList.remove('drag-over');
    });

    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    draggedElement.style.opacity = '1';

    // Find the closest kanban-column to drop into
    var dropTarget = ev.target;
    while(dropTarget && !dropTarget.classList.contains('kanban-column')) {
        dropTarget = dropTarget.parentElement;
    }
    
    if (dropTarget) {
        dropTarget.appendChild(draggedElement);
    }
}

// Remove drag-over highlighting when leaving zone
document.querySelectorAll('.kanban-column').forEach(col => {
    col.addEventListener('dragleave', function(ev) {
        ev.target.classList.remove('drag-over');
    });
});
