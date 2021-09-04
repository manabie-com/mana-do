import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function setStorage(name: string, value: any) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function getStorage(name: string) {
  const value = localStorage.getItem(name)
  return value ? JSON.parse(value) : null
}
