//tüm elementleri seçtik
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector("#list-group");
const firstCardBody = document.querySelector(".card-head");
const secondCardBody = document.querySelector(".card-footer");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const alert = document.createElement("div");

eventListener();

// big bang; her şey burada başlıyor .00
function eventListener() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  clearButton.addEventListener("click", clearAllTodos);
  filter.addEventListener("keyup", filterTodos);
  todoList.addEventListener("click", checked);
}

// tüm todoları arayüzden kaldırma işlemi
function clearAllTodos() {
  if (confirm("Tüm To-Do ları silmek istediğinize emin misiniz")) {
    //todoList.innerHTML = ""; doğrudur fakat oldukça yavaş bir işlemdir

    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

//todo değerleri içerisinde filtreleme işlemi yapıyor
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listitems = document.querySelectorAll(".li-group");
  // console.log(e.target.value);

  listitems.forEach(function (x) {
    const text = x.textContent.toLowerCase();
    // console.log(text);
    if (text.indexOf(filterValue) === -1) {
      x.setAttribute("style", "display : none");
    } else {
      x.setAttribute("style", "display : block");
    }
  });
}

//listeden silmek istediğimiz elemanları seçip, silmeye gönderiyoruz
function deleteTodo(e) {
  let value;
  // console.log(e.target);
  // console.log(e.target.parentElement);
  // console.log(e.target.parentElement.textContent);

  if (e.target.id === "closed") {
    e.target.parentElement.remove();
    value = e.target.parentElement.textContent;
    deleteTodoFromStorage(value);
    alertDelete("To-Do başarılı bir şekilde silindi");
  }
}

//sildiğimiz dataları localde güncelleme işlemi
function deleteTodoFromStorage(value) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === value) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

//sayfayı yeniden açtığımızda önceden kaydettiğimiz todo ları tekrar ekrana yazdırıyoruz .11
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUi(todo);
  });
}

//bir değer girip girmediğimiz kontrol etme işlevi, bu değeri locale ve UI ye atama işlevi .10
function addTodo(e) {
  const newTodo = todoInput.value.trim();
  // console.log(newTodo);
  let todos = getTodosFromStorage();
  let temporary;

  todos.forEach(function (todo) {
    if (todo === newTodo) {
      temporary = todo;
    }
  });

  if (newTodo === "") {
    alertWarning("lütfen bir To-Do giriniz !!!");
  } else if (newTodo === temporary) {
    alertAlready("Girdiğiniz değer zaten mevcuttur");
    todoInput.value = "";
  } else {
    addTodoToUi(newTodo);
    addTodoToStorage(newTodo);
    alertSuccess("To-Do başarıyla eklendi");
  }

  e.preventDefault();
}

//girdiğimiz değeri localde olup olmadığını kontrol etme işlevi .30
function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

//localde kontrol yaptıktan sonra, yeni değerimizi locale atama işlevi .21
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

//string değerini list item olarak UI ya ekleme işlemi .20
function addTodoToUi(newTodo) {
  //list item oluşturma
  const listItem = document.createElement("li");
  const span = document.createElement("i");

  listItem.className = "li-group";
  span.className = "fa fa-remove";
  span.id = "closed";
  //text node oluşturma, girdiğimiz değeri newTodo ile listitem e ekleme işlevi
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(span);

  //todo liste list item ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";
}

//değerleri sildikten sonra ekrana çıkan yazı
function alertDelete(message) {
  alert.className = "delete";
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}
// hiçbir değer girmezsek çıkan uyarı yazısı ..0
function alertWarning(message) {
  alert.className = "warning";
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}
// bir metin girdiğimizde çıkan başarılı yazısı ..0
function alertSuccess(message) {
  alert.className = "success";
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}
//girdiğimiz değer zaten mevcut ise gözükecek "zaten mevcut yazısı"
function alertAlready(message) {
  alert.className = "already";
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function checked(e) {
  if (e.target.tagName === "LI") e.target.classList.toggle("checked");
}
