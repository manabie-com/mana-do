import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function saveTodos(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function removeAllTodos() {
  localStorage.removeItem("todos");
}
