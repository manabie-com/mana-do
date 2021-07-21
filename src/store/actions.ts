import {Todo, TodoStatus} from "../models/todo";
import {
  clearTodoStorage,
  storeTodos,
  storeTodosStatus,
  storeDeleteTodos,
  storeTodosContent,
  storeToggleAllTodosStatus
} from '../utils/storeageUtils';

export const SET_TODO = 'SET_TODO';
export const TODO_LOADING = 'TODO_LOADING';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_TODO_CONTENT = 'UPDATE_TODO_CONTENT';
export const FILTER_STATUS_CHANGED = 'FILTER_STATUS_CHANGED';

export interface SetFilterStatusChangedAction {
  type: typeof FILTER_STATUS_CHANGED,
  payload: TodoStatus
}

export interface SetTodoAction {
  type: typeof SET_TODO,
  payload: Array<Todo>
}

export interface TodosLoadingAction {
  type: typeof TODO_LOADING
}

export const todosLoading = () => ({
  type: TODO_LOADING
})

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos
  }
}

export function setFilterStatusChanged(status: TodoStatus): SetFilterStatusChangedAction {
  return {
    type: FILTER_STATUS_CHANGED,
    payload: status
  }
}

///////////
export interface CreateTodoAction {
  type: typeof CREATE_TODO,
  payload: Todo
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  // Update the local storage and handle dispatch CREATE_TODO action
  storeTodos(newTodo);
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
    checked: boolean
  }
}

export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  // Update the local storage and handle dispatch UPDATE_TODO_STATUS action
  storeTodosStatus(todoId, checked);
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked
    }
  }
}

export interface UpdateTodoContentAction {
  type: typeof UPDATE_TODO_CONTENT
  payload: {
    todoId: string,
    content: string
  }
}

export function updateTodoContent(todoId: string, content: string): UpdateTodoContentAction {
  // Update the local storage and handle dispatch UPDATE_TODO_CONTENT action
  storeTodosContent(todoId, content);
  return {
    type: UPDATE_TODO_CONTENT,
    payload: {
      todoId,
      content
    }
  }
}

//////////////
export interface DeleteTodoAction {
  type: typeof DELETE_TODO,
  payload: string
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  // Update the local storage and handle dispatch DELETE_TODO action
  storeDeleteTodos(todoId);
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
  // Clear the local storage and handle dispatch DELETE_ALL_TODOS action
  clearTodoStorage();
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
  // Update the local storage and handle dispatch TOGGLE_ALL_TODOS action
  storeToggleAllTodosStatus(checked);
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked
  }
}

export type AppActions =
  SetTodoAction |
  CreateTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction | UpdateTodoContentAction | SetFilterStatusChangedAction | TodosLoadingAction;
