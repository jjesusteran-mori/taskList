// define Ui Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection'); // ul
const clearBtn = document.querySelector('.clear-tasks'); // btn
const filter = document.querySelector('#filter'); // task filter
const taskInput = document.querySelector('#task'); //new task input

// load all event listeners
loadEventListeners();

// load all even listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter taks event
    filter.addEventListener('keyup', filterTasks);
}

// get task from local stroage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
        // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = "<i class='fa fa-remove'></i>"
    // append the link to li
    li.appendChild(link);

    // append li to ul 'ul is parent of li'
    taskList.appendChild(li);
    })
};

// add task
function addTask(e) {
    e.preventDefault();

    if(taskInput.value === '') {
        alert('Add a task');
    }
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = "<i class='fa fa-remove'></i>"
    // append the link to li
    li.appendChild(link);

    // append li to ul 'ul is parent of li'
    taskList.appendChild(li);

    //store in localstorage
    storeTaskInLocalStorage(taskInput.value)

    // clear input once 'add task is clicked'
    taskInput.value = '';
}

// localstorage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// remove task function
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        // confirm if task gets removed
        if(confirm('Are you sure?')){
            //removes the parent of 'target' -> 'a tag' -> 'li tag'    
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clear tasks
function clearTasks() {

    // taskList.innerHTML = '';

    // faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    };
};

// filter task
function filterTasks(e) {
    // anything that is entered in the filter section is stored in text
    const text = e.target.value.toLowerCase();
    //we can use forEach because querySelectorAll returns a node list
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            // text content of anything with .collection-item class is stored in item
            const item = task.firstChild.textContent;
            // -1 means thers no match
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block'
            }else {
                task.style.display = 'none'
            }
        }
    );
}

