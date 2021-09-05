import * as types from "./Todo.constants"
import {Todo} from "models/todo";

export function getTodoList() {
  return {
    type: types.GET_TODO_LIST,
  }
}

export interface SetTodoAction {
  type: typeof types.SET_TODO_LIST,
  payload: Array<Todo>
}
export function setTodoList(todoList: Array<Todo>): SetTodoAction {
  return {
    type: types.SET_TODO_LIST,
    payload: todoList
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

export interface UpdateTodoAction {
  type: typeof types.UPDATE_TODO,
  payload: {
    field: string,
    value: any,
    id: string
  }
}

export function updateTodo(field: string, value: any, id: string): UpdateTodoAction {
  return {
    type: types.UPDATE_TODO,
    payload: {
      field,
      value,
      id
    }
  }
}

export interface UpdateAllTodoAction {
  type: typeof types.TOGGLE_ALL_TODO_LIST,
  payload: {
    status: string
  }
}

export function updateAllTodo(status: string): UpdateAllTodoAction {
  return {
    type: types.TOGGLE_ALL_TODO_LIST,
    payload: {
      status
    }
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

export interface UpdateTodoContentAction {
  type: typeof types.UPDATE_TODO_STATUS_CONTENT,
  payload: {
    content: string, todoId: string
  }
}

export function updateTodoContent(content: string, todoId: string): UpdateTodoContentAction {
  return {
    type: types.UPDATE_TODO_STATUS_CONTENT,
    payload: {
      content,
      todoId
    }
  }
}

//////////////
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

//////////////
export interface DeleteAllTodoListAction {
  type: typeof types.DELETE_ALL_TODO_LIST,
}

export function deleteAllTodoList(): DeleteAllTodoListAction {
  return {
    type: types.DELETE_ALL_TODO_LIST,
  }
}

///////////
export interface ToggleAllTodosAction {
  type: typeof types.TOGGLE_ALL_TODO_LIST,
  payload: boolean
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: types.TOGGLE_ALL_TODO_LIST,
    payload: checked
  }
}