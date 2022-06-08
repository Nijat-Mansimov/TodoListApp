const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}

function clearAllTodos(e){
    if (confirm("Bütün tapşırıqları silmək istədiyinizdən əminsiniz?")){
        todoList.innerHTML = "";
        localStorage.removeItem("todos");
        // console.log("Silindi");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue)=== -1){
            // Axtarilan sozu tapmayanda 
        listItem.setAttribute("style", "display: none !important");
        }else{
            listItem.setAttribute("style", "display: block");
        }
    });
}

function deleteTodo(e){
    // console.log(e.target);
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Tapşırıq silindi...");
    }
}

function deleteTodoFromStorage(deletetodo, index){
    let todos = getTodosFromStorage();
    todos.forEach(function(i){
        if (i===deletetodo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){

    const newTodo = todoInput.value.trim();
    // console.log(newTodo);
    if(newTodo===""){
        /*
                    <div class="alert alert-danger" role="alert">
                        Qutunun içərisini boş buraxmayın!
                    </div> 
        */ 
        showAlert("danger", "Keçərli bir məlumat daxil edin!");
    }else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Tapşırıq qeydə alındı...")
    }

    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
     
}

function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    // console.log(alert);
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000);

}

function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    

    // link yaradiriq
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // list item yaradiriq 
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    listItem.addEventListener("mouseover",function(e){
        listItem.setAttribute("style", "background-color: #bdc3c7");
        // console.log(e.type);
    });
    listItem.addEventListener("mouseout",function(e){
        listItem.setAttribute("style", "background-color: white");
        // console.log(e.type);
    });
    // Yaradilan listi elave edirik
    todoList.appendChild(listItem);
    todoInput.value = "";

}

// let elementList = document.querySelector(".list-group-item");

// elementList.addEventListener("mouseover", function(){
//     elementList.setAttribute("style", "background-color: #ccc");
// })

