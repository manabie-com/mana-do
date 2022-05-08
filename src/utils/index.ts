import { TodoStatus } from "models";

export function isTodoCompleted(status: TodoStatus | undefined): boolean {
  return status === TodoStatus.COMPLETED;
}

export function isTodoActive(status: TodoStatus | undefined): boolean {
  return status === TodoStatus.ACTIVE;
}

export function changeTodoStatus(checked: boolean): TodoStatus {
  return checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
}

export function getTodoStatus(checked: boolean): TodoStatus {
  return checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
}
