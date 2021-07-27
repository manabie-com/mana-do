import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}
export const isAuthentication = () => {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  return !!token;
};