import { Todo, TodoStatus } from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export const KEY_TODOS = 'todos';

export const saveToLocalStorage = (todos: Array<Todo>): void => {
  localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
};
