import { Todo, TodoStatus } from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}
export function setKey<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getKey<T>(key: string): T {
  const data = localStorage.getItem(key);
  return JSON.parse(data as string);
}
