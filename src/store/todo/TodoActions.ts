import {Todo, TodoStatus} from '../../models/todo';

export const ACTION_TYPES = {
  FETCH_TODOS: 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAIL: 'FETCH_TODOS_FAIL',
  ADD_TODO: 'ADD_TODO',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_FAIL: 'ADD_TODO_FAIL',
  UPDATE_TODO: 'UPDATE_TODO',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_FAIL: 'UPDATE_TODO_FAIL',
  REMOVE_TODO: 'REMOVE_TODO',
  REMOVE_TODO_SUCCESS: 'REMOVE_TODO_SUCCESS',
  REMOVE_TODO_FAIL: 'REMOVE_TODO_FAIL',
  REARRANGE_TODOS: 'REARRANGE_TODOS',
  REARRANGE_TODOS_SUCCESS: 'REARRANGE_TODOS_SUCCESS',
  REARRANGE_TODOS_FAIL: 'REARRANGE_TODOS_FAIL',
  REMOVE_ALL_TODOS: 'REMOVE_ALL_TODOS',
  REMOVE_ALL_TODOS_SUCCESS: 'REMOVE_ALL_TODOS_SUCCESS',
  REMOVE_ALL_TODOS_FAIL: 'REMOVE_ALL_TODOS_FAIL',
  UPDATE_ALL_TODOS_STATUS: 'UPDATE_ALL_TODOS_STATUS',
  UPDATE_ALL_TODOS_STATUS_SUCCESS: 'UPDATE_ALL_TODOS_STATUS_SUCCESS',
  UPDATE_ALL_TODOS_STATUS_FAIL: 'UPDATE_ALL_TODOS_STATUS_FAIL',
}

export interface IFetchTodosAction {
  type: string;
}

export interface IFetchTodosFailedAction {
  type: string;
  errorMessage: string;
}

export interface IFetchTodosSucceedAction {
  type: string;
  todos: Todo[];
}

export interface IAddTodoAction {
  type: string;
  content: string;
}

export interface IAddTodoFailedAction {
  type: string;
  errorMessage: string;
}

export interface IAddTodoSucceedAction {
  type: string;
  todo: Todo;
}

export interface IUpdateTodoAction {
  type: string;
  id: string;
  status?: TodoStatus;
  content?: string;
}

export interface IUpdateTodoSucceedAction {
  type: string;
  todo: Todo;
}

export interface IUpdateTodoFailedAction {
  type: string;
  errorMessage: string;
}

export interface IRemoveTodoAction {
  type: string;
  id: string;
}

export interface IRemoveTodoSucceedAction {
  type: string;
  id: string;
}

export interface IRemoveTodoFailedAction {
  type: string;
  errorMessage: string;
}

export interface IRearrangeTodosAction {
  type: string;
  todos: Todo[];
}

export interface IRearrangeTodosSucceedAction {
  type: string;
  todos: Todo[];
}

export interface IRearrangeTodosFailedAction {
  type: string;
  errorMessage: string;
}

export interface IRemoveAllTodosAction {
  type: string;
}

export interface IRemoveAllTodosSucceedAction {
  type: string;
}

export interface IRemoveAllTodosFailedAction {
  type: string;
  errorMessage: string;
}

export interface IUpdateAllTodosStatusAction {
  type: string;
  status: TodoStatus;
  todos: Todo[];
}

export interface IUpdateAllTodosStatusSucceedAction {
  type: string;
  todos: Todo[];
}

export interface IUpdateAllTodosStatusFailedAction {
  type: string;
  errorMessage: string;
}

export type ITodoActions =
  IFetchTodosAction |
  IFetchTodosFailedAction |
  IFetchTodosSucceedAction |
  IAddTodoAction |
  IAddTodoFailedAction |
  IAddTodoSucceedAction |
  IUpdateTodoAction |
  IUpdateTodoSucceedAction |
  IUpdateTodoFailedAction |
  IRemoveTodoAction |
  IRemoveTodoFailedAction |
  IRemoveTodoSucceedAction |
  IRearrangeTodosAction |
  IRearrangeTodosFailedAction |
  IRearrangeTodosSucceedAction |
  IRemoveAllTodosAction |
  IRemoveAllTodosFailedAction |
  IRemoveAllTodosSucceedAction |
  IUpdateAllTodosStatusAction |
  IUpdateAllTodosStatusFailedAction |
  IUpdateAllTodosStatusSucceedAction

const fetchTodos = (): IFetchTodosAction => {
  return {
    type: ACTION_TYPES.FETCH_TODOS,
  };
};
const fetchTodosFailed = (errorMessage: string): IFetchTodosFailedAction => {
  return {
    type: ACTION_TYPES.FETCH_TODOS_FAIL,
    errorMessage,
  };
};
const fetchTodosSucceed = (todos: Todo[]): IFetchTodosSucceedAction => {
  return {
    type: ACTION_TYPES.FETCH_TODOS_SUCCESS,
    todos,
  };
};

const addTodo = (content: string): IAddTodoAction => {
  return {
    type: ACTION_TYPES.ADD_TODO,
    content
  }
};

const addTodoFailed = (errorMessage: string): IAddTodoFailedAction => {
  return {
    type: ACTION_TYPES.ADD_TODO_FAIL,
    errorMessage,
  }
}

const addTodoSucceed = (todo: Todo): IAddTodoSucceedAction => {
  return {
    type: ACTION_TYPES.ADD_TODO_SUCCESS,
    todo
  }
}

const updateTodo = (id: string, data: { status?: TodoStatus, content?: string }): IUpdateTodoAction => {
  return {
    type: ACTION_TYPES.UPDATE_TODO,
    id,
    status: data.status,
    content: data.content,
  }
}

const updateTodoSucceed = (todo: Todo): IUpdateTodoSucceedAction => {
  return {
    type: ACTION_TYPES.UPDATE_TODO_SUCCESS,
    todo,
  }
}

const updateTodoFailed = (errorMessage: string): IUpdateTodoFailedAction => {
  return {
    type: ACTION_TYPES.UPDATE_TODO_FAIL,
    errorMessage,
  }
}

const removeTodo = (id: string): IRemoveTodoAction => {
  return {
    type: ACTION_TYPES.REMOVE_TODO,
    id,
  }
}
const removeTodoSucceed = (id: string): IRemoveTodoSucceedAction => {
  return {
    type: ACTION_TYPES.REMOVE_TODO_SUCCESS,
    id,
  }
}

const removeTodoFailed = (errorMessage: string): IRemoveTodoFailedAction => {
  return {
    type: ACTION_TYPES.REMOVE_TODO_FAIL,
    errorMessage,
  }
}

const rearrangeTodo = (todos: Todo[]): IRearrangeTodosAction => {
  return {
    type: ACTION_TYPES.REARRANGE_TODOS,
    todos,
  }
}
const rearrangeTodoSucceed = (todos: Todo[]): IRearrangeTodosSucceedAction => {
  return {
    type: ACTION_TYPES.REARRANGE_TODOS_SUCCESS,
    todos,
  }
}

const rearrangeTodoFailed = (errorMessage: string): IRearrangeTodosFailedAction => {
  return {
    type: ACTION_TYPES.REARRANGE_TODOS_FAIL,
    errorMessage,
  }
}

const removeAllTodos = (): IRemoveAllTodosAction => {
  return {
    type: ACTION_TYPES.REMOVE_ALL_TODOS
  }
}

const removeAllTodosSucceed = (): IRemoveAllTodosSucceedAction => {
  return {
    type: ACTION_TYPES.REMOVE_ALL_TODOS_SUCCESS
  }
}

const removeAllTodosFailed = (errorMessage: string): IRemoveAllTodosFailedAction => {
  return {
    type: ACTION_TYPES.REMOVE_ALL_TODOS_FAIL,
    errorMessage,
  }
}

const updateAllTodosStatus = (status: TodoStatus, todos: Todo[]): IUpdateAllTodosStatusAction => {
  return {
    type: ACTION_TYPES.UPDATE_ALL_TODOS_STATUS,
    status,
    todos
  }
}

const updateAllTodosStatusSucceed = (todos: Todo[]): IUpdateAllTodosStatusSucceedAction => {
  return {
    type: ACTION_TYPES.UPDATE_ALL_TODOS_STATUS_SUCCESS,
    todos
  }
}

const updateAllTodosStatusFailed = (errorMessage: string): IUpdateAllTodosStatusFailedAction => {
  return {
    type: ACTION_TYPES.UPDATE_ALL_TODOS_STATUS_FAIL,
    errorMessage,
  }
}


export default {
  fetchTodos,
  fetchTodosFailed,
  fetchTodosSucceed,
  addTodo,
  addTodoFailed,
  addTodoSucceed,
  updateTodo,
  updateTodoFailed,
  updateTodoSucceed,
  removeTodo,
  removeTodoFailed,
  removeTodoSucceed,
  rearrangeTodo,
  rearrangeTodoFailed,
  rearrangeTodoSucceed,
  removeAllTodos,
  removeAllTodosFailed,
  removeAllTodosSucceed,
  updateAllTodosStatus,
  updateAllTodosStatusFailed,
  updateAllTodosStatusSucceed,
}
