import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from "./constant";
import { Todo } from "./models";

export interface CreateTodoAction {
  type: typeof CREATE_TODO;
  payload: Todo;
}

export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS;
  payload: {
    todoId: string;
    checked: boolean;
  };
}

export interface UpdateTodoContentAction {
  type: typeof UPDATE_TODO_CONTENT;
  payload: {
    todoId: string;
    content: string;
  };
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS;
}

export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS;
  payload: boolean;
}
