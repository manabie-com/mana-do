import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(status?: TodoStatus): boolean {
  return status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function getItemLeft(itemNumber: number): string {
  return `${itemNumber} ${itemNumber === 1 ? "item" : "items"} left`
}