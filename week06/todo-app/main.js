class TodoItem {
    constructor(task) {
        this.id = Date.now();
        this.content = task;
        this.completed = false;
    }
}

function addTodo() {
    // Get the entry
    var todo = document.getElementById("todo").value;
    
    if (todo !== '') {
        saveEntry(todo);
    } else {
        showError();
    }
    document.getElementById("todo").value = '';
}

function displayEntry(todo) {
    var todoItemDiv = document.createElement('div');
    todoItemDiv.setAttribute('class', 'todoItem');
    todoItemDiv.setAttribute('id', todo.id)

    var checkIcon = document.createElement("span");
    checkIcon.setAttribute('class', 'material-icons');
    checkIcon.innerText = "check_box_outline_blank";
    checkIcon.setAttribute("id", "iconFor" + todo.id)
    checkIcon.myParam = todo.id;
    
    var taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'task');
    taskDiv.innerText = todo.content;

    var removeIcon = document.createElement('span');
    removeIcon.setAttribute('class', 'material-icons');
    removeIcon.innerText = "delete_forever";
    removeIcon.addEventListener('click', deleteTask, false);
    removeIcon.myParam = todo.id;
    
    if (todo.completed){
        todoItemDiv.classList.add("completed");
        checkIcon.innerText = "check_box";
    } else {
        checkIcon.addEventListener('click', completeTask, false);
    }
    
    todoItemDiv.appendChild(checkIcon);
    todoItemDiv.appendChild(taskDiv);
    todoItemDiv.appendChild(removeIcon);

    document.getElementsByClassName('todoList')[0].appendChild(todoItemDiv);

}

async function completeTask(e) {
    document.getElementById(e.currentTarget.myParam).classList.add("completed");
    document.getElementById("iconFor"+e.currentTarget.myParam).innerText = "check_box";
    var entries = await getEntries();
    
    var status = entries.findIndex(entry => entry.id === e.currentTarget.myParam);
    entries[status].completed = true

  
    localStorage.setItem('testItem', JSON.stringify(entries));
}

async function deleteTask(e) {
    document.getElementById(e.currentTarget.myParam).remove();

    var entries = await getEntries();
    
    var deleteable = entries.find(entry => entry.id === e.currentTarget.myParam);


    var updatedTasks = entries.filter(entry => entry !== deleteable);

    localStorage.setItem('testItem', JSON.stringify(updatedTasks));
}

async function saveEntry(entry) {

    var entries = await getEntries();

    var todo = new TodoItem(entry);

    displayEntry(todo, "all");
    entries.push(todo);
    console.log(entries);

    localStorage.setItem('testItem', JSON.stringify(entries));
}

async function getEntries() {
    var entries = await JSON.parse(localStorage.getItem('testItem'));
    if (entries !== null) {
        return entries;
    } else {
        entries = [];
        return entries;
    }
}

async function getTodos() {
    document.getElementsByClassName('todoList')[0].innerHTML = '';

    var todos = await getEntries();
    
    displayCount(todos.filter(item => item.completed === false).length, " tasks left");

    if (todos !== null) {
        todos.forEach(todo => {
            displayEntry(todo);
        });
    } else {
        // ADD A message to add a todo!
    }

}

function displayCount(count, txt) {
    var taskCount = document.getElementsByClassName('count')[0];
    taskCount.innerHTML = '';

    if (count === 1) {
        taskCount.innerText = count + txt;
    } else {
        taskCount.innerText = count + txt;

    }
    
}


// filters 
async function activeTodos() {
    document.getElementsByClassName('todoList')[0].innerHTML = '';
    var todos = await getEntries();
    displayCount(todos.filter(item => item.completed === false).length, " active tasks.");

    if (todos !== null) {
        todos.filter(todo => todo.completed === false)
        .forEach(todo => {
            displayEntry(todo);
        });
    }
}

async function completedTodos() {
    document.getElementsByClassName('todoList')[0].innerHTML = '';
    var todos = await getEntries();
    
    displayCount(todos.filter(item => item.completed === true).length, " completed tasks.");

    if (todos !== null) {
        todos.filter(todo => todo.completed === true)
        .forEach(todo => {
            displayEntry(todo);
        });
    }
}



function showError() {
    document.getElementById('err').innerText = "You need to enter some text first!"
    setTimeout(function(){ document.getElementById('err').innerText = '' }, 3000);
}


