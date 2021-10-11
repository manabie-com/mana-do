
import * as types from './constants';
import { Todo } from "models/todo";

export interface SetTodoAction {
  type: typeof types.SET_TODO,
  payload: Array<Todo>
}
export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: types.SET_TODO,
    payload: todos
  }
}


export interface CreateTodoAction {
  type: typeof types.CREATE_TODO,
  payload: Todo
}
export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: types.CREATE_TODO,
    payload: newTodo
  }
}

export interface UpdateTodoStatusAction {
  type: typeof types.UPDATE_TODO_STATUS,
  payload: {
    todoId: string,
    checked: boolean
  }
}
export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  return {
    type: types.UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked
    }
  }
}

export interface DeleteTodoAction {
  type: typeof types.DELETE_TODO,
  payload: string
}
export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: types.DELETE_TODO,
    payload: todoId
  }
}

export interface DeleteAllTodosAction {
  type: typeof types.DELETE_ALL_TODOS,
}
export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: types.DELETE_ALL_TODOS,
  }
}

export interface ToggleAllTodosAction {
  type: typeof types.TOGGLE_ALL_TODOS,
  payload: boolean
}
export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: types.TOGGLE_ALL_TODOS,
    payload: checked
  }
}

export type TodoActions =
  SetTodoAction |
  CreateTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction;
