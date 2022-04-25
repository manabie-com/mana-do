import { Todo } from '../models/todo';
import {
    CREATE_TODO, DELETE_ALL_TODOS, DELETE_TODO, SET_TODO, TOGGLE_ALL_TODOS, UPDATE_TODO_CONTENT,
    UPDATE_TODO_STATUS, UPDATE_TODO_TOGGLE
} from './constants';

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

///////////
export interface CreateTodoAction {
  type: typeof CREATE_TODO;
  payload: Todo;
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  };
}

//////////////
export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS;
  payload: {
    todoId: string;
    checked: boolean;
  };
}

export function updateTodoStatus(
  todoId: string,
  checked: boolean
): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked,
    },
  };
}

//////////////
export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
}

//////////////
export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS;
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
  };
}

///////////
export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS;
  payload: boolean;
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked,
  };
}

export interface UpdateTodoContentAction {
  type: typeof UPDATE_TODO_CONTENT;
  payload: {
    todoId: string;
    content: string;
  };
}

export function updateTodoUpdateTodoContent(
  todoId: string,
  content: string
): UpdateTodoContentAction {
  return {
    type: UPDATE_TODO_CONTENT,
    payload: {
      todoId,
      content,
    },
  };
}

export interface UpdateTodoToggleAction {
  type: typeof UPDATE_TODO_TOGGLE;
  payload: {
    todoId: string;
    toggle: boolean;
  };
}

export function updateTodoToggle(
  todoId: string,
  toggle: boolean
): UpdateTodoToggleAction {
  return {
    type: UPDATE_TODO_TOGGLE,
    payload: {
      todoId,
      toggle,
    },
  };
}

export type AppActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction
  | UpdateTodoContentAction
  | UpdateTodoToggleAction;
