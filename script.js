// Load tasks from local storage
document.addEventListener('DOMContentLoaded', function() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTaskToDOM(task);
    });
});

// Add task
function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
        var task = { text: taskText, completed: false };
        addTaskToDOM(task);
        saveTasks();
        taskInput.value = '';
    }
}

// Add task to the DOM
function addTaskToDOM(task) {
    var taskList = document.getElementById('taskList');
    var li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button onclick="toggleTaskCompletion(this)">✓</button>
        <button onclick="removeTask(this)">✗</button>
    `;
    taskList.appendChild(li);
}


// Toggle task completion
function toggleTaskCompletion(button) {
    var li = button.parentElement;
    li.querySelector('span').classList.toggle('completed');
    button.textContent = button.textContent === 'Mark Complete' ? 'Mark Incomplete' : 'Mark Complete';
    saveTasks();
}

// Remove task
function removeTask(button) {
    var li = button.parentElement;
    li.remove();
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    var tasks = [];
    var taskElements = document.querySelectorAll('#taskList li');
    taskElements.forEach(function(taskElement) {
        tasks.push({ text: taskElement.querySelector('span').textContent, completed: taskElement.querySelector('span').classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
