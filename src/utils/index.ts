import {Todo, TodoStatus, LocalKey} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function setLocalStorage(key: LocalKey, value: string): void {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key: LocalKey): Todo[] {
  const localData = localStorage.getItem(key);
  return localData ? JSON.parse(localData) : null;
}