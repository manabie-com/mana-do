import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export const toCapitalize = (s: string): string =>  {
  return s[0].toUpperCase() + s.toLowerCase().substring(1);
}

export const formatDate = (currentDate: string): string => {
  return currentDate.substring(0, 10).split('-').reverse().join('/');
}
export const remainTodoActive = (todos: Todo[]): number => {
    return todos.filter(td => !isTodoCompleted(td)).length;
}