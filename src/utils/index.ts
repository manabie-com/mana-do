import { Todo, TodoStatus } from "../models/todo";

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return token != null && token !== "" && token != undefined && token.length > 0;
}
