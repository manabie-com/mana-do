import {Todo} from "../models/todo";

export const SET_TODO = 'SET_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SHOW_EDIT_FORM_TODO = 'SHOW_EDIT_FORM_TODO';
export const CLOSE_EDIT_FORM = 'CLOSE_EDIT_FORM';
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_TODO_CONTENT = 'UPDATE_TODO_CONTENT';

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
export interface updateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS,
  payload: {
    todo: Todo[],
  }
}

export function updateTodoStatus(todo: Todo[]): updateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todo
    }
  }
}

//////////////
export interface showEditTodoContentAction {
  type: typeof SHOW_EDIT_FORM_TODO,
  payload: {
    todoId: string,
  }
}

export function showEditFormTodo(todoId: string): showEditTodoContentAction {
  return {
    type: SHOW_EDIT_FORM_TODO,
    payload: {
      todoId
    }
  }
}

//////////////
export interface closeEditFormAction {
  type: typeof CLOSE_EDIT_FORM
}

export function closeAllEditForm(): closeEditFormAction {
  return {
    type: CLOSE_EDIT_FORM,
  }
}

//////////////
export interface updateTodoContentAction {
  type: typeof UPDATE_TODO_CONTENT,
  payload: {
    todo: Todo[]
  }
}

export function updateTodoContent(todo: Todo[]): updateTodoContentAction {
  return {
    type: UPDATE_TODO_CONTENT,
    payload: {
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
  updateTodoStatusAction |
  updateTodoContentAction |
  showEditTodoContentAction |
  closeEditFormAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction;