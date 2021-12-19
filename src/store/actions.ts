import { Theme } from "../components/ThemeProvider";
import { Todo, TodoStatus } from "../models/todo";
import { AppState } from "./reducer";

export const SET_APP_STATE = "SET_APP_STATE";
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const DELETE_ALL_TODOS = "DELETE_ALL_TODOS";
export const TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_THEME = "UPDATE_THEME";
export const UPDATE_SELECTED_STATUS = "UPDATE_SELECTED_STATUS";

export interface SetAppState {
  type: typeof SET_APP_STATE;
  payload: AppState;
}

export function setAppState(appState: AppState): SetAppState {
  return {
    type: SET_APP_STATE,
    payload: appState,
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

export interface UpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: Todo;
}

export function updateTodo(todo: Todo): UpdateTodoAction {
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
}

export interface UpdateThemeAction {
  type: typeof UPDATE_THEME;
  payload: Theme;
}

export function updateTheme(theme: Theme): UpdateThemeAction {
  return {
    type: UPDATE_THEME,
    payload: theme,
  };
}

export interface UpdateSelectedStatus {
  type: typeof UPDATE_SELECTED_STATUS;
  payload: TodoStatus;
}

export function updateSelectedStatus(
  selected: TodoStatus
): UpdateSelectedStatus {
  return {
    type: UPDATE_SELECTED_STATUS,
    payload: selected,
  };
}

export type AppActions =
  | SetAppState
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction
  | UpdateTodoAction
  | UpdateThemeAction
  | UpdateSelectedStatus;
