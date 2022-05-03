import { EnhanceTodoStatus } from '../components/types';
import { Todo } from '../types/types';
import { SET_TODO, CREATE_TODO, UPDATE_TODO_STATUS, DELETE_TODO, DELETE_ALL_TODOS, TOGGLE_ALL_TODOS, EDIT_TODO, FILTER_TODOS } from './constants';

export interface SetTodoAction {
  type: typeof SET_TODO,
  payload: Array<Todo>
}

export interface CreateTodoAction {
  type: typeof CREATE_TODO,
  payload: Todo
}

export interface EditTodoAction {
  type: typeof EDIT_TODO,
  payload: {
      todoId: string,
      todoContent: string
  }
}

export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS,
  payload: {
    todoId: string,
    checked: boolean
  }
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO,
  payload: string
}

export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS,
}

export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS,
  payload: boolean
}

export interface AppState {
  todos: Array<Todo>,
  filteredBy: EnhanceTodoStatus | 'ALL',
}

export interface FilterToDosAction {
  type: typeof FILTER_TODOS,
  payload: { filter: EnhanceTodoStatus | 'ALL' }
}

export type AppActions =
  SetTodoAction |
  CreateTodoAction |
  EditTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction |
  FilterToDosAction;
