import { Todo, TodoStatus } from '../models/todo';
import { TODOS_KEY } from './constant';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function setLocalStorage(todo: Todo[]): void {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todo));
}

export function getLocalStorage(): Todo[] {
  const todos = localStorage.getItem(TODOS_KEY);
  if (!todos) return [];
  return JSON.parse(todos);
}
