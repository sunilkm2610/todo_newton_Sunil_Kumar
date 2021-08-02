//Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const curDate = new Date();
const time = document.querySelector(".time");

time.innerText = new Date().toLocaleString();
//Event listeners
todoBtn.addEventListener("click",additem);
todoList.addEventListener("click",checkdelete);
document.addEventListener("DOMContentLoaded",gettodos);






//functions
setInterval(()=>{time.innerText = new Date().toLocaleString();},1000);
function additem(event){
    event.preventDefault();
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const todoli = document.createElement('li');
    todoli.innerText = todoInput.value;
    todoli.classList.add('todo-item');
    todoDiv.append(todoli);
    //check mark
    const completed = document.createElement('button');
    completed.classList.add('completed-btn');
    completed.innerHTML = '<i class="fas fa-check"></i>';
    //delete
    const deletebtn = document.createElement('button');
    deletebtn.classList.add('delBtn');
    deletebtn.innerHTML = '<i class="fas fa-trash"></i>';

    todoDiv.append(completed);
    todoDiv.append(deletebtn);
    todoList.append(todoDiv);
    //Add todo to loaclStorage
    savelocalStorage(todoInput.value);
    todoInput.value = "";
}

function checkdelete(e){
    const item = e.target;
    if(item.classList[0] === "delBtn"){
        const todo = item.parentElement;
        removeTodofromlocal(todo);
        todo.remove();
    }
    if(item.classList[0] === "completed-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        
    }
}

function savelocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo); 
    localStorage.setItem('todos',JSON.stringify(todos));
}

function gettodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const todoli = document.createElement('li');
        todoli.innerText = todo ;
        todoli.classList.add('todo-item');
        todoDiv.append(todoli);
        //check mark
        const completed = document.createElement('button');
        completed.classList.add('completed-btn');
        completed.innerHTML = '<i class="fas fa-check"></i>';
        //delete
        const deletebtn = document.createElement('button');
        deletebtn.classList.add('delBtn');
        deletebtn.innerHTML = '<i class="fas fa-trash"></i>';
    
        todoDiv.append(completed);
        todoDiv.append(deletebtn);
        todoList.append(todoDiv);
        
    });
}

function removeTodofromlocal(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const indextodo = (todo.children[0].innerText);
    todos.splice(todos.indexOf(indextodo),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}



