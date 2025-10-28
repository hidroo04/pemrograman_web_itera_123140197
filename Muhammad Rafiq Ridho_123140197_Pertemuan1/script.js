const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskCourseInput = document.getElementById('task-course');
const taskDeadlineInput = document.getElementById('task-deadline');
const taskList = document.getElementById('task-list');
const pendingCountSpan = document.getElementById('pending-count');
const formError = document.getElementById('form-error');
const filterStatus = document.getElementById('filter-status');
const searchCourse = document.getElementById('search-course');


function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : []; 
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    let tasks = getTasks();
    taskList.innerHTML = ''; 

    const filter = filterStatus.value;
    const search = searchCourse.value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        const statusMatch = (filter === 'all') || 
                            (filter === 'completed' && task.isCompleted) || 
                            (filter === 'pending' && !task.isCompleted);
        
        const searchMatch = task.course.toLowerCase().includes(search);

        return statusMatch && searchMatch;
    });

    filteredTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = task.isCompleted ? 'task-item completed' : 'task-item pending';
        listItem.dataset.id = task.id; 

        const deadlineDate = new Date(task.deadline).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        listItem.innerHTML = `
            <div class="task-info">
                <h3>${task.name}</h3>
                <p>Mata Kuliah: <strong>${task.course}</strong></p>
                <p>Deadline: <span>${deadlineDate}</span></p>
            </div>
            <div class="task-actions">
                <button class="toggle-btn" 
                        title="${task.isCompleted ? 'Tandai Belum Selesai' : 'Tandai Selesai'}"
                        data-action="toggle">
                    ${task.isCompleted ? '✅' : '⏳'}
                </button>
                <button class="delete-btn" title="Hapus Tugas" data-action="delete">🗑️</button>
            </div>
        `;
        
        taskList.appendChild(listItem);
    });

    const pendingTasks = tasks.filter(task => !task.isCompleted);
    pendingCountSpan.textContent = pendingTasks.length;
}

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = taskNameInput.value.trim();
    const course = taskCourseInput.value.trim();
    const deadline = taskDeadlineInput.value;

    if (name === '' || course === '' || deadline === '') {
        formError.textContent = 'Semua kolom wajib diisi.';
        return;
    }

    const today = new Date().setHours(0,0,0,0);
    const inputDate = new Date(deadline).setHours(0,0,0,0);
    if (inputDate < today) {
    }


    formError.textContent = ''; 

    const newTask = {
        id: Date.now(),
        name: name,
        course: course,
        deadline: deadline,
        isCompleted: false
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    taskForm.reset();
    renderTasks();
});

taskList.addEventListener('click', function(e) {

    const button = e.target.closest('button');
    if (!button) return;

    const listItem = button.closest('li');
    if (!listItem) return;
    
    const taskId = parseInt(listItem.dataset.id);
    let tasks = getTasks();
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return; 

    const action = button.dataset.action;

    if (action === 'toggle') {
        tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
        saveTasks(tasks);
        renderTasks(); 
        
    } else if (action === 'delete') {
        if (confirm('Yakin ingin menghapus tugas ini?')) {
            tasks.splice(taskIndex, 1);
            saveTasks(tasks);
            renderTasks(); 
        }
    }
});

filterStatus.addEventListener('change', renderTasks);
searchCourse.addEventListener('input', renderTasks);

window.onload = renderTasks;