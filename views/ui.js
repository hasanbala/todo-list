class UI {
  static addTodoToUi(todo) {
    const listItem = document.createElement("li");
    const span = document.createElement("i");
    const todoList = document.querySelector("#list-group");

    listItem.className = "li-group";
    span.className = "fa fa-remove";
    span.id = "closedx";

    listItem.appendChild(document.createTextNode(todo));
    listItem.appendChild(span);
    todoList.appendChild(listItem);
  }

  static loadAllTodosToUI() {
    let todos = Storage.getTodosFromStorage();

    todos.forEach((todox) => {
      UI.addTodoToUi(todox);
    });
  }

  static checked(e) {
    if (e.target.tagName === "LI") e.target.classList.toggle("checked");
  }

  static alertDelete(message) {
    const alert = document.createElement("div");
    const firstCardBody = document.querySelector(".card-head");

    alert.className = "delete";
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 1000);
  }

  static alertWarning(message) {
    const alert = document.createElement("div");
    const firstCardBody = document.querySelector(".card-head");

    alert.className = "warning";
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 1000);
  }

  static alertSuccess(message) {
    const alert = document.createElement("div");
    const firstCardBody = document.querySelector(".card-head");

    alert.className = "success";
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 1000);
  }

  static alertAlready(message) {
    const alert = document.createElement("div");
    const firstCardBody = document.querySelector(".card-head");

    alert.className = "already";
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 1000);
  }
}
