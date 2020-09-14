import { ITodo, ETodoStatus } from '../types/todo';

// Helper for bussiness logic common

export function isTodoCompleted(todo: ITodo): boolean {
  return todo.status === ETodoStatus.COMPLETED;
}

export function isTodoActive(todo: ITodo): boolean {
  return todo.status === ETodoStatus.ACTIVE;
}