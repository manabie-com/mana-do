import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function filterTodos(todos: Todo[]): {
  activeTodos: Todo[],
  completedTodos: Todo[]
} {
  return {
    activeTodos: todos.filter(todo => isTodoActive(todo)),
    completedTodos: todos.filter(todo => isTodoCompleted(todo))
  }
}