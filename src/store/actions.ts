import { Todo } from "../models/todo";

export const SIGN_IN = "SIGN_IN";
export const SET_TODO = "SET_TODO";
export const CREATE_TODO = "CREATE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const DELETE_ALL_TODOS = "DELETE_ALL_TODOS";
export const TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";

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

///////////
export interface EditTodoAction {
  type: typeof EDIT_TODO;
  payload: {
    id: string;
    newText: string;
  };
}

export function updateTodo(id: string, newText: string): EditTodoAction {
  return {
    type: EDIT_TODO,
    payload: { id, newText },
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

export interface SignInAction {
  type: typeof SIGN_IN;
  payload: string;
  history: any;
}

export function signInAction(token: string, history: any): SignInAction {
  return {
    type: SIGN_IN,
    payload: token,
    history,
  };
}

export type AppActions =
  | SignInAction
  | SetTodoAction
  | CreateTodoAction
  | EditTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction;
