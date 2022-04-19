import { ITodo, TodoStatus } from "../models/todo";

export function isTodoCompleted(todo: ITodo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: ITodo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}
