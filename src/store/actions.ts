import {Todo, TodoStatus} from "../models/todo";

export const SET_TODO = 'SET_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_TODO = 'UPDATE_TODO'

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

//////////////
export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS,
  payload: {
    todoId: string,
    status: TodoStatus
  }
}

export function updateTodoStatus(todoId: string, status: TodoStatus): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      status
    }
  }
}

//////////////
export interface UpdateTodoAction {
  type: typeof UPDATE_TODO,
  payload: {
    todoId: string,
    todo: Partial<Omit<Todo, 'id'>>
  }
}

export function updateTodo(todoId: string, todo: Partial<Omit<Todo, 'id'>>): UpdateTodoAction {
  return {
    type: UPDATE_TODO,
    payload: {
      todoId,
      todo
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
  payload: TodoStatus
}

export function toggleAllTodos(status: TodoStatus): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: status
  }
}

export type AppActions =
  SetTodoAction |
  CreateTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction |
  UpdateTodoAction 