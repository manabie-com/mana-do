import { Todo } from "../../models/todo";

import {
  SET_TODO,
  CREATE_TODO,
  UPDATE_TODO_STATUS,
  DELETE_TODO,
  DELETE_ALL_TODOS,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
} from "../../constants";

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
///////////
export interface UpdateTodoContent {
  type: typeof UPDATE_TODO_CONTENT;
  payload: Todo;
}

export function updateTodoContent(todo: Todo): UpdateTodoContent {
  return {
    type: UPDATE_TODO_CONTENT,
    payload: todo,
  };
}

export type AppActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction
  | UpdateTodoContent;
