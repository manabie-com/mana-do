import { Todo, TodoStatus } from '../models/todo';

export function isTodoCompleted(status?: TodoStatus): boolean {
  return status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function getItemLeft(itemNumber: number): string {
  return `${itemNumber} ${itemNumber === 1 ? "item" : "items"} left`
}

export function isJsonString(string: string): boolean {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}