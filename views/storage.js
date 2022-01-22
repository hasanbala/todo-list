class Storage {
  static getTodosFromStorage() {
    let todos;
    localStorage.getItem("todos") == null
      ? (todos = [])
      : (todos = JSON.parse(localStorage.getItem("todos")));
    return todos;
  }

  static addTodoToStorage(todo) {
    let todos = this.getTodosFromStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static deleteTodoFromStorage(value) {
    let todos = this.getTodosFromStorage();
    todos.forEach((todo, index) => {
      todo === value ? todos.splice(index, 1) : null;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
