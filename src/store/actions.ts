import { Todo } from '../models/todo';

export const GET_TODOS = 'GET_TODOS';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const CREATE_TODO = 'CREATE_TODO';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const DELETE_ALL_TODOS_SUCCESS = 'DELETE_ALL_TODOS_SUCCESS';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';

export interface GetTodoAction {
  type: typeof GET_TODOS;
}

export function getTodos(): GetTodoAction {
  return { type: GET_TODOS };
}

///////////
export interface GetTodoSuccessAction {
  type: typeof GET_TODOS_SUCCESS;
  payload: Array<Todo>;
}

export function getTodosSuccess(todos: Array<Todo>): GetTodoSuccessAction {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
}

///////////
export interface CreateTodoAction {
  type: typeof CREATE_TODO;
  payload: string;
}

export function createTodo(content: string): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: content,
  };
}

///////////
export interface CreateTodoSuccessAction {
  type: typeof CREATE_TODO_SUCCESS;
  payload: Todo;
}

export function createTodoSuccess(neTodo: Todo): CreateTodoSuccessAction {
  return {
    type: CREATE_TODO_SUCCESS,
    payload: neTodo,
  };
}

//////////////
export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS;
  payload: { todoId: string; checked: boolean };
}

export function updateTodoStatus(
  todoId: string,
  checked: boolean
): UpdateTodoStatusAction {
  return { type: UPDATE_TODO_STATUS, payload: { todoId, checked } };
}

//////////////
export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return { type: DELETE_TODO, payload: todoId };
}

//////////////
export interface DeleteTodoSuccessAction {
  type: typeof DELETE_TODO_SUCCESS;
  payload: string;
}

export function deleteTodoSuccess(todoId: string): DeleteTodoSuccessAction {
  return { type: DELETE_TODO_SUCCESS, payload: todoId };
}

//////////////
export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS;
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return { type: DELETE_ALL_TODOS };
}

//////////////
export interface DeleteAllTodosSuccessAction {
  type: typeof DELETE_ALL_TODOS_SUCCESS;
}

export function deleteAllTodosSuccess(): DeleteAllTodosSuccessAction {
  return { type: DELETE_ALL_TODOS_SUCCESS };
}

///////////
export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS;
  payload: boolean;
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return { type: TOGGLE_ALL_TODOS, payload: checked };
}

export type AppActions =
  | GetTodoAction
  | GetTodoSuccessAction
  | CreateTodoAction
  | CreateTodoSuccessAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteTodoSuccessAction
  | DeleteAllTodosSuccessAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction;
