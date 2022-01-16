import { Theme } from "models/theme";
import { Todo, TodoStatusType } from "../models/todo";
import { 
  CREATE_TODO, 
  DELETE_ALL_TODOS, 
  DELETE_TODO, 
  TOGGLE_ALL_TODOS, 
  TOGGLE_THEME, 
  UPDATE_TODO_CONTENT, 
  UPDATE_TODO_STATUS 
} from "./action-types";

export interface CreateTodoAction {
  type: typeof CREATE_TODO,
  payload: Todo
}

export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS,
  payload: {
    todoId: string,
    status: TodoStatusType
  }
}

export interface UpdateTodoContentAction {
  type: typeof UPDATE_TODO_CONTENT,
  payload: {
    todoId: string,
    content: string
  }
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO,
  payload: string
}

export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS,
}

export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS,
  payload: TodoStatusType
}

export interface ToggleThemeAction {
  type: typeof TOGGLE_THEME,
  payload: Theme
}

export type AppActions =
  CreateTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction | 
  UpdateTodoContentAction |
  ToggleThemeAction;