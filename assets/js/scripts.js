let tasks = []

const taskInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const totalTask = document.getElementById('total-task');
const completedTask = document.getElementById('completed-task');
const pendingTask = document.getElementById('pending-task');
const toDoList = document.getElementById('todo-list');

function addTask() {
    const description = taskInput.value;

    if(description !== ''){
        const newTask = {
            id: Date.now(),
            description: description,
            completed: false,
        }

        tasks.push(newTask);
        taskInput.value = '';
        renderTask();
    }
}

addBtn.addEventListener('click', addTask);

//render
function renderTask() {
    toDoList.innerHTML = tasks.map((task, index) => `
        <li class= "tasks-added">
            <div>
                <span>${index + 1} -</span>
                <span>${task.description}</span>
            </div>
            <div class"">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toogle(${task.id})"/>
                <button id='delete-btn' onclick="deleteTask(${task.id})">ELIMINAR</button>
            </div>
        </li>
    `).join('');

    updateCounter();
}

// funcion para los contadores

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalTask.innerHTML = total;
    completedTask.innerHTML = completed;
    pendingTask.innerHTML = pending;
}

// funcion borrar tarea 

function deleteTask(taskId){
    tasks = tasks.filter( task => task.id !== taskId);
    renderTask()
}

// funcion estado de checkbox
function toogle(taskId) {
    const task = tasks.find(task => task.id === taskId)
    if(task) {
        task.completed = !task.completed
        renderTask();
    }
}

