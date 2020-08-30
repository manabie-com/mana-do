import { Todo } from './../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === 'COMPLETED';
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === 'ACTIVE';
}
