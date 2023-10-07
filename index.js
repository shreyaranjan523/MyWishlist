let todoInput=document.querySelector(".input");
let addTodoButton=document.querySelector(".button");
let todo;

let localData=JSON.parse(localStorage.getItem("todo"));
let todoList=localData ||  [];
let showTodos=document.querySelector(".todos-container");


function uuid(){
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(param) {
        let number=Math.random() * 16 | 0;
        let randomNumber = param == 'x'? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}

addTodoButton.addEventListener("click" , (e) => {
    e.preventDefault();
    todo=todoInput.value;
    // console.log(todo);
    if(todo.length>0){
        todoList.push({id: uuid(), todoname: todo, isCompleted: false});
    }
    // console.log(todoList);
    renderTodoList(todoList);
    localStorage.setItem("todo", JSON.stringify(todoList));
    todoInput.value = "";
});

showTodos.addEventListener("click", (e) => {
    // console.log("clicked");
    let key = e.target.dataset.key;
    let delTodoKey = e.target.dataset.todokey;
    // console.log(key);
    // console.log(e.target);
    todoList = todoList.map(ptr => ptr.id === key ? {...ptr, isCompleted: !ptr.isCompleted} : ptr);
    todoList = todoList.filter((ptr) => ptr.id !== delTodoKey);
    localStorage.setItem("todo", JSON.stringify(todoList));
    renderTodoList(todoList);
    console.log(todoList);
})

function renderTodoList(todoList){
    // console.log(todoList);
    showTodos.innerHTML= todoList.map(({id, todoname, isCompleted})=>
    `<div class="relative">
        <input id="item-${id}" type="checkbox" data-key=${id} ${isCompleted ? "checked" : ""}>
        <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" data-key=${id}>${todoname}</label>
        <button class="absolute right-0 button cursor">
            <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
        </button>
    </div>`)
}

renderTodoList(todoList);

// ---Destructuring---
// const todo={id:"123", todo: "sky diving", isCompleted: false};
// const {id, todo, isCompleted}=todo;