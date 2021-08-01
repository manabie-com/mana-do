import { ITodo, TodoStatus } from '../modules/todo/store/todo.constant';

export function isTodoCompleted(todo: ITodo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: ITodo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}