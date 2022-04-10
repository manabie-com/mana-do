import {Todo} from "../models/todo";
import * as constants from './constants';

export interface SetTodoAction {
  type: typeof constants.SET_TODO,
  payload: Array<Todo>
}

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: constants.SET_TODO,
    payload: todos
  }
}

///////////
export interface CreateTodoAction {
  type: typeof constants.CREATE_TODO,
  payload: Todo
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: constants.CREATE_TODO,
    payload: newTodo
  }
}

//////////////
export interface UpdateTodoStatusAction {
  type: typeof constants.UPDATE_TODO_STATUS,
  payload: {
    todoId: string,
    checked: boolean
  }
}

export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  return {
    type: constants.UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked
    }
  }
}

//////////////
export interface DeleteTodoAction {
  type: typeof constants.DELETE_TODO,
  payload: string
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: constants.DELETE_TODO,
    payload: todoId
  }
}

//////////////
export interface DeleteAllTodosAction {
  type: typeof constants.DELETE_ALL_TODOS,
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: constants.DELETE_ALL_TODOS,
  }
}

///////////
export interface ToggleAllTodosAction {
  type: typeof constants.TOGGLE_ALL_TODOS,
  payload: boolean
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: constants.TOGGLE_ALL_TODOS,
    payload: checked
  }
}


export interface FilterTodosAction {
  type: typeof constants.FILTER_TODOS,
  payload: string
}

export function FilterTodos(payload: string): FilterTodosAction {
  return {
    type: constants.FILTER_TODOS,
    payload,
  }
}

export type AppActions =
  SetTodoAction |
  CreateTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction |
  FilterTodosAction;