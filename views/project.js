const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector("#list-group");
const secondCardBody = document.querySelector(".card-footer");
const filter = document.querySelector("#filter");
const modal = document.querySelector("#clearList");
const clearButton = document.querySelector(".clear-todos-all");
const clearAllYes = document.querySelector(".ques-but1");
const clearAllNo = document.querySelector(".ques-but2");

(function eventListener() {
  form.addEventListener("submit", addTodo);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  todoList.addEventListener("click", (e) => {
    UI.checked(e);
  });
  document.addEventListener("DOMContentLoaded", () => {
    UI.loadAllTodosToUI();
  });
  clearButton.addEventListener("click", clearAll);
  modal.addEventListener("click", (e) => {
    e.target == modal ? (modal.style.display = "none") : null;
  });
})();

function clearAll() {
  const localStore = localStorage.getItem("todos");
  if (localStore == null || localStore.length == 2) {
    UI.alertDelete("There are no items to delete in the list");
  } else {
    modal.style.display = "block";
    clearAllNo.addEventListener("click", () => {
      modal.style.display = "none";
    });
    clearAllYes.addEventListener("click", () => {
      while (todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
      }
      localStorage.removeItem("todos");
      modal.style.display = "none";
    });
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listitems = document.querySelectorAll(".li-group");

  listitems.forEach((x) => {
    const text = x.textContent.toLowerCase();
    text.indexOf(filterValue) === -1
      ? x.setAttribute("style", "display : none")
      : x.setAttribute("style", "display : block");
  });
}

function deleteTodo(e) {
  let valuex;
  if (e.target.id === "closedx") {
    valuex = e.target.parentElement.textContent;
    e.target.parentElement.remove();
    Storage.deleteTodoFromStorage(valuex);
    UI.alertDelete("The selected item has been successfully deleted");
  }
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();
  const todos = Storage.getTodosFromStorage();
  let temporary;

  todos.forEach((todox) => (todox == newTodo ? (temporary = todox) : null));

  if (newTodo == "") {
    UI.alertWarning("Please enter a valid value !");
  } else if (newTodo == temporary) {
    UI.alertAlready("The value you entered already exists !");
    todoInput.value = "";
  } else {
    UI.addTodoToUi(newTodo);
    Storage.addTodoToStorage(newTodo);
    todoInput.value = "";
    UI.alertSuccess("The value successfully added to list");
  }

  // UI.clearInputs(todoInput);
  e.preventDefault();
}
