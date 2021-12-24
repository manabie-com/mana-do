import {Todo} from "../models/todo";

export const SET_TODO = 'SET_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const KEY_EDIT_TODO = 'KEY_EDIT_TODO';
export const START_EDIT_TODO = 'START_EDIT_TODO';
export const END_EDIT_TODO = 'END_EDIT_TODO';
export const CANCEL_EDIT_TODO = 'CANCEL_EDIT_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';


export interface SetTodoAction {
  type: typeof SET_TODO,
  payload: Array<Todo>
}

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos
  }
}

///////////
export interface CreateTodoAction {
  type: typeof CREATE_TODO,
  payload: Todo
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo
  }
}
///////////
export interface KeyEditTodoAction {
  type: typeof KEY_EDIT_TODO,
  payload: Todo
}

export function keyEditTodo(todoId: Todo): KeyEditTodoAction {
  return {
    type: KEY_EDIT_TODO,
    payload: todoId
  }
}
///////////
export interface StartEditTodoAction {
  type: typeof START_EDIT_TODO,
  payload: number
}

export function startEditTodo(todoId: number): StartEditTodoAction {
  return {
    type: START_EDIT_TODO,
    payload: todoId
  }
}
///////////
export interface EndEditTodoAction {
  type: typeof END_EDIT_TODO,
  payload: {
    index: number,
    title: any 
  }
  
}

export function endEditTodo(index: number, title: any): EndEditTodoAction {
  return {
    type: END_EDIT_TODO,
    payload: {
      index,
      title
    }
  }
}
///////////
export interface CancelEditTodoAction {
  type: typeof CANCEL_EDIT_TODO,
  
}

export function cancelEditTodo(): CancelEditTodoAction {
  return {
    type: CANCEL_EDIT_TODO,
  }
}

//////////////
export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS,
  payload: {
    todoId: string,
    checked: boolean
  }
}

export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked
    }
  }
}

//////////////
export interface DeleteTodoAction {
  type: typeof DELETE_TODO,
  payload: string
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId
  }
}

//////////////
export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS,
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
  }
}

///////////
export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS,
  payload: boolean
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked
  }
}

export type AppActions =
  SetTodoAction |
  CreateTodoAction |
  KeyEditTodoAction |
  StartEditTodoAction |
  EndEditTodoAction |
  CancelEditTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction;