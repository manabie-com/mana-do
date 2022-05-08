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
  if (currentDate) {
    return currentDate.substring(0, 10).split('-').reverse().join('/');
  }
  return currentDate;
}
export const remainTodoActive = (todos: Todo[]): number => {
    return todos.filter(td => !isTodoCompleted(td)).length;
}