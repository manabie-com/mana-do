import { ActionType } from "../action-types";
import { Todo } from "../../models/todo";

export interface SetTodoAction {
  type: ActionType.SET_TODO;
  payload: Array<Todo>;
}
export interface CreateTodoAction {
  type: ActionType.CREATE_TODO;
  payload: Todo;
}

export interface UpdateTodoStatusAction {
  type: ActionType.UPDATE_TODO_STATUS;
  payload: {
    todoId: string;
    checked: boolean;
  };
}

export interface DeleteTodoAction {
  type: ActionType.DELETE_TODO;
  payload: string;
}

export interface DeleteAllTodosAction {
  type: ActionType.DELETE_ALL_TODOS;
}

export interface ToggleAllTodosAction {
  type: ActionType.TOGGLE_ALL_TODOS;
  payload: boolean;
}

export interface UpdateTodoContent {
  type: ActionType.UPDATE_TODO_CONTENT;
  payload: {
    todoId: string;
    content: string;
  };
}

export type TodoAction =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction
  | UpdateTodoContent;
