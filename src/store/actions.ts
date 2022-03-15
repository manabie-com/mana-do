import { Todo } from "../models/todo";

export const SET_TODO = "SET_TODO";
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const DELETE_ALL_TODOS = "DELETE_ALL_TODOS";
export const TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";
export const UPDATE_TODO_CONTENT = "UPDATE_TODO_CONTENT";

export interface SetTodoAction {
  type: typeof SET_TODO;
  payload: Array<Todo>;
}

// use at first load, get saved todo then display
export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos,
  };
}

export interface CreateTodoAction {
  type: typeof CREATE_TODO;
  payload: Todo;
}

// fire when user want to add a new todo
export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  };
}

export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS;
  payload: {
    todoId: string;
    checked: boolean;
  };
}

// update a todo status (ex: ACTIVE -> COMPLETED)
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

export interface UpdateTodoContentAction {
  type: typeof UPDATE_TODO_CONTENT;
  payload: {
    todoId: string;
    newContent: string;
  };
}

// when user want to update their todo content
export function updateTodoContent(
  todoId: string,
  newContent: string
): UpdateTodoContentAction {
  return {
    type: UPDATE_TODO_CONTENT,
    payload: {
      todoId,
      newContent,
    },
  };
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

// when user want to delete their todo
export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
}

export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS;
}

// when user want to delete all todo
export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
  };
}

export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS;
  payload: boolean;
}

// when user want to select all todo
export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked,
  };
}

export type AppActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | UpdateTodoContentAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction;
