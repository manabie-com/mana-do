import { Todo } from '../models/todo'

export const SET_TODO = 'SET_TODO'
export const CREATE_TODO = 'CREATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS'
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS'
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS'
export const UPDATE_TODO_DATA = 'UPDATE_TODO_DATA'
export const DELETE_ITEM_TODO_DATA = 'DELETE_ITEM_TODO_DATA'

export interface SetTodoAction {
  type: typeof SET_TODO
  payload: Array<Todo>
}

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos,
  }
}

///////////
export interface CreateTodoAction {
  type: typeof CREATE_TODO
  payload: Todo
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  }
}

//////////////
export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS
  payload: {
    todoId: string
    checked: boolean
  }
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
  }
}

//////////////
export interface DeleteTodoAction {
  type: typeof DELETE_TODO
  payload: string
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId,
  }
}

//////////////
export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
  }
}

///////////
export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS
  payload: boolean
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked,
  }
}

export interface UpdateTodoDataAction {
  type: typeof UPDATE_TODO_DATA
  payload: {
    todoId: string
    values: object
  }
}

export function updateTodoData(
  todoId: string,
  values: object
): UpdateTodoDataAction {
  return {
    type: UPDATE_TODO_DATA,
    payload: {
      todoId,
      values,
    },
  }
}

export interface DeleteItemTodoDataAction {
  type: typeof DELETE_ITEM_TODO_DATA
  payload: {
    idItem: string
  }
}

export function deleteItemTodoData(idItem: string): DeleteItemTodoDataAction {
  return {
    type: DELETE_ITEM_TODO_DATA,
    payload: {
      idItem,
    },
  }
}

export type AppActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction
  | UpdateTodoDataAction
  | DeleteItemTodoDataAction
