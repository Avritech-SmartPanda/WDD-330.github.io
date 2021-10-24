class TodoItem {
    constructor(task) {
        this.id = Date.now();
        this.content = task;
        this.completed = false;
    }
}

const LOCAL_STORAGE_KEY = 'data'
const entries = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
const taskList = document.getElementById('todos');
const all = document.getElementById('all');
const complete = document.getElementById('complete');
const active = document.getElementById('active');

const addTodo = () => {
    var todo = document.getElementById("todo").value;
    if (todo !== '' && todo !== null) {
        saveEntry(todo);
    } else {
        showError();
    }
    document.getElementById("todo").value = '';
}


const saveEntry = (entry) => {
    var entries = getEntries();
    var todo = new TodoItem(entry);
    entries.push(todo);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
    displayTodos();
}

const getEntries = () => {
    if (entries == null) {
        entries = [];
    }
    return entries;
}

const displayTodos = () => {
    getAllTodos();
    getActiveTodos();
    getCompletedTodos();
};


displayTodos()
function displayEntry(todo) {
    var todoItemDiv = document.createElement('div');
    todoItemDiv.setAttribute('class', 'todoItem');
    todoItemDiv.setAttribute('id', todo.id)

    var checkbox = document.createElement("span");
    checkbox.setAttribute('class', 'material-icons');
    checkbox.innerText = "check_box_outline_blank";
    checkbox.setAttribute("id", "iconFor" + todo.id)
    checkbox.myParam = todo.id;

    var taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'task');
    taskDiv.innerText = todo.content;

    var deleteBtn = document.createElement('span');
    deleteBtn.setAttribute('class', 'material-icons close');
    deleteBtn.innerText = "clear";
    deleteBtn.addEventListener('click', deleteTask, false);
    deleteBtn.myParam = todo.id;
    if (todo.completed) {
        todoItemDiv.classList.add("completed");
        checkbox.innerText = "check_box";
    } else {
        checkbox.addEventListener('click', completeTask, true);
    }

    todoItemDiv.appendChild(checkbox);
    todoItemDiv.appendChild(taskDiv);
    todoItemDiv.appendChild(deleteBtn);

    taskList.appendChild(todoItemDiv);

}




function setActiveTab(view) {
    const buttonAll = document.getElementById('all');
    const buttonActive = document.getElementById('active');
    const buttonComplete = document.getElementById('complete');

    if (view === 'all') {
        buttonAll.classList.add('active');
        buttonActive.classList.remove('active');
        buttonComplete.classList.remove('active');
    } else if (view === 'active') {
        buttonAll.classList.remove('active');
        buttonActive.classList.add('active');
        buttonComplete.classList.remove('active');
    } else if (view === 'complete') {
        buttonAll.classList.remove('active');
        buttonActive.classList.remove('active');
        buttonComplete.classList.add('active');
    }
}






function completeTask(e) {
    document.getElementById(e.currentTarget.myParam).classList.add("completed");
    document.getElementById("iconFor" + e.currentTarget.myParam).innerText = "check_box";
    var entries = getEntries();
    var status = entries.findIndex(entry => entry.id === e.currentTarget.myParam);
    entries[status].completed = true;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
    getAllTodos()
}

function deleteTask(e) {
    document.getElementById(e.currentTarget.myParam).remove();
    var entries = getEntries();
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].id == e.currentTarget.myParam) {
            entries.splice(i, 1);
        }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
    getAllTodos()
}




function displayCount(count, txt) {
    var taskCount = document.getElementsByClassName('progress')[0];
    taskCount.innerHTML = '';

    if (count === 1) {
        taskCount.innerText = count + txt;
    } else {
        taskCount.innerText = count + txt;

    }

}


function getAllTodos() {
    setActiveTab('all');
    taskList.innerHTML = '';
    var todos = getEntries();
    displayCount(todos.filter(item => item.completed === false).length, " tasks left");
    if (todos !== null) {
        todos.forEach(todo => {
            displayEntry(todo);
        });
    }

}

// filters 
function getActiveTodos() {
    setActiveTab('active');
    taskList.innerHTML = '';
    var todos = getEntries();
    displayCount(todos.filter(item => item.completed === false).length, " active tasks.");

    if (todos !== null) {
        todos.filter(todo => todo.completed === false)
            .forEach(todo => {
                displayEntry(todo);
            });
    }
}

function getCompletedTodos() {
    setActiveTab('complete');
    taskList.innerHTML = '';
    var todos = getEntries();
    displayCount(todos.filter(item => item.completed === true).length, " completed tasks.");

    if (todos !== null) {
        todos.filter(todo => todo.completed === true)
            .forEach(todo => {
                displayEntry(todo);
            });
    }
}



function showError() {
    document.getElementById('err').innerHTML = "You need to enter some text first!"
    setTimeout(()=> { document.getElementById('err').innerHTML = '' }, 3000);
}


