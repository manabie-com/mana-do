import { TodoStatus } from "../models/todo";

// for checking todo status , just need passing todo.status instead of todo object
export function isTodoCompleted(status: TodoStatus | undefined): boolean {
  return status === TodoStatus.COMPLETED;
}

export function isTodoActive(status: TodoStatus): boolean {
  return status === TodoStatus.ACTIVE;
}
