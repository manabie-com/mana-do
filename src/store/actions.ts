import { Todo } from '../models/todo';

export const SET_TODO = 'SET_TODO';

export interface SetTodoAction {
  type: typeof SET_TODO;
  payload: Array<Todo>;
}

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos,
  };
}

export type AppActions = SetTodoAction;
