import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.Completed;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.Active;
}
