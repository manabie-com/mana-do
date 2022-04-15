import { Todo, TodoStatus } from '../models/todo'
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_ALL_TODOS,
  DELETE_ALL_TODOS_SUCCESS,
  TOGGLE_ALL_TODOS,
  TOGGLE_ALL_TODOS_SUCCESS,
} from '../config/constants'

export interface GetTodoAction {
  type: typeof GET_TODOS
}

export interface GetTodoSuccessAction {
  type: typeof GET_TODOS_SUCCESS
  payload: Array<Todo>
}

export interface CreateTodoAction {
  type: typeof CREATE_TODO
  payload: string
}

export interface CreateTodoSuccessAction {
  type: typeof CREATE_TODO_SUCCESS
  payload: Todo
}

export interface UpdateTodoAction {
  type: typeof UPDATE_TODO
  payload: { todoId: string; status?: TodoStatus; content?: string }
}

export interface UpdateTodoSuccessAction {
  type: typeof UPDATE_TODO_SUCCESS
  payload: { todoId: string; status?: TodoStatus; content?: string }
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO
  payload: string
}

export interface DeleteTodoSuccessAction {
  type: typeof DELETE_TODO_SUCCESS
  payload: string
}

export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS
}

export interface DeleteAllTodosSuccessAction {
  type: typeof DELETE_ALL_TODOS_SUCCESS
}

export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS
  payload: {
    todoIds: string[]
    checked: boolean
  }
}

export interface ToggleAllTodosSuccessAction {
  type: typeof TOGGLE_ALL_TODOS_SUCCESS
  payload: { todoIds: string[]; status: TodoStatus }
}

export type AppActions =
  | GetTodoAction
  | GetTodoSuccessAction
  | CreateTodoAction
  | CreateTodoSuccessAction
  | UpdateTodoAction
  | UpdateTodoSuccessAction
  | DeleteTodoAction
  | DeleteTodoSuccessAction
  | DeleteAllTodosSuccessAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction
  | ToggleAllTodosSuccessAction
