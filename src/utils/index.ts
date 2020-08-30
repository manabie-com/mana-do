import { Todo, TodoStatus } from '../models/todo';

export { getCachedToken, cacheToken } from './localStorage';
export { validateToken } from './token';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}
