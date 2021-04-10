import { Todo, TodoStatus } from "../models/todo";

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function getLocalStore(key: string): any {
  return localStorage.getItem(key) || "";
}

export function setLocalStore(key: string, value: any): any {
  localStorage.setItem(key, JSON.stringify(value));
}
