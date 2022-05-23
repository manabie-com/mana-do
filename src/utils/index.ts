import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function setLocalStorage(key: string, todo: Todo[]): void {
  localStorage.setItem(key, JSON.stringify(todo));
}

export function getLocalStorage(key: string): Todo[]  {
  const todoList = localStorage.getItem(key);
  return todoList ? JSON.parse(todoList) : [];
}