import { STORAGE_TODO, Todo, TodoStatus } from "../../models/todo";

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function setLocalStorage(todo: Array<Todo>): void {
  return localStorage.setItem(STORAGE_TODO, JSON.stringify(todo));
}

export function getLocalStorage(key: string): string {
  return localStorage.getItem(key) || "[]";
}

export function clearLocalStorage(key: string): void {
  return localStorage.removeItem(key);
}
