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
    // add task event
    form.addEventListener('submit', addTask)
}

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

    // clear input once 'add task is clicked'
    taskInput.value = '';

}