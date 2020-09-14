import { Todo, TodoStatus } from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function isToggleAllTodo(todos: Array<Todo>) {
  return !todos.some(todo => todo.status !== TodoStatus.COMPLETED)
}