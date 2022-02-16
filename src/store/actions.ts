import { Todo, Status } from '../models/todo';
import ActionTypes from './actionTypes';
export interface SetTodoAction {
  type: typeof ActionTypes.SET_TODO,
  payload: Array<Todo>
}
export interface CreateTodoAction {
  type: typeof ActionTypes.CREATE_TODO,
  payload: Todo
}


export interface UpdateTodoStatusAction {
  type: typeof ActionTypes.UPDATE_TODO_STATUS,
  payload: {
    todoId: string,
    checked: boolean
  }
}

export interface DeleteAllTodosAction {
  type: typeof ActionTypes.DELETE_ALL_TODOS,
}


export interface DeleteTodoAction {
  type: typeof ActionTypes.DELETE_TODO,
  payload: string
}

export interface ToggleAllTodosAction {
  type: typeof ActionTypes.TOGGLE_ALL_TODOS,
  payload: boolean
}

export interface UpdateTodoContentAction {
  type: typeof ActionTypes.UPDATE_TODO,
  payload: {
    todoId: string,
    content: string
  }
}

export interface SetStatusAction {
  type: typeof ActionTypes.SET_TODO_STATUS,
  payload: Status
}

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: ActionTypes.SET_TODO,
    payload: todos
  }
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: ActionTypes.CREATE_TODO,
    payload: newTodo
  }
}

export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  return {
    type: ActionTypes.UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked
    }
  }
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: todoId
  }
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: ActionTypes.DELETE_ALL_TODOS,
  }
}


export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: ActionTypes.TOGGLE_ALL_TODOS,
    payload: checked
  }
}

export function updateTodoContent(todoId: string, content: string): UpdateTodoContentAction {
  return {
    type: ActionTypes.UPDATE_TODO,
    payload: {
      todoId,
      content
    }
  }
}

export function setStatus(status: Status): SetStatusAction {
  console.log(status);
  return {
    type: ActionTypes.SET_TODO_STATUS,
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
  UpdateTodoContentAction |
  SetStatusAction;