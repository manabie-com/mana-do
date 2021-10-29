import { Todo } from "../models/todo";
export const SET_TODO = "SET_TODO";
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const DELETE_ALL_TODOS = "DELETE_ALL_TODOS";
export const TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";
export const UPDATE_TODO = "UPDATE_TODO";

export interface SetTodoAction {
  type: typeof SET_TODO;
  payload: Array<Todo> | Todo;
}

export function setTodos(todos: Array<Todo> | Todo): SetTodoAction {
  return {
    type: SET_TODO,
    // payload: Array.isArray(todos) ? todos : [todos],
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
  payload: {
    id: string;
  };
}

export function deleteTodo(id: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: {
      id: id,
    },
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
  payload: {
    checked: boolean;
  };
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: {
      checked,
    },
  };
}

export interface UpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: {
    id: string;
    content: string;
  };
}

export function updateTodo({
  id,
  content,
}: {
  id: string;
  content: string;
}): UpdateTodoAction {
  console.log("run");
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      content,
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
  | UpdateTodoAction;
