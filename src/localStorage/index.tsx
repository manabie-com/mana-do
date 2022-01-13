import Todo from "../models/todo";

const TODO_KEY = "TODO_KEY";

class LocalStorage {
  updateToDoToLocalStorage(todoList: Todo[]): void {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
  }

  getTodoList() {
    return JSON.parse(localStorage.getItem(TODO_KEY) ?? "[]") as Todo[];
  }
}

export default new LocalStorage();
