import { Todo, TodoStatus } from "../models/todo";

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export const getClassNameActiveByType = (showing: string, buttonType: string): string => {
  return showing === buttonType ? "Button__active" : "";
};
