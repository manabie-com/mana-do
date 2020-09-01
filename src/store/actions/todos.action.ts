import { Dispatch } from 'redux';
import {
  getTodos as getTodosApi,
  createTodo as createTodoApi,
  updateTodoStatus as updateTodoStatusApi,
  deleteTodo as deleteTodoApi,
  updateAllTodosStatus as updateAllTodosStatusApi,
  deleteAllTodos as deleteAllTodosApi,
  updateTodoContent as updateTodoContentApi,
} from '../../apis/todo.apis';
import { TodoStatus } from '../../models/todo';
import { Todo } from '../../models/todo';

// SET_TODO
export interface SetTodoAction {
  type: 'SET_TODOS';
  payload: Todo[];
}
export function setTodos(todo: Todo[]): SetTodoAction {
  return {
    type: 'SET_TODOS',
    payload: todo,
  };
}

// GET_TODO
export const getTodos = () => async (dispatch: Dispatch) => {
  const todos = await getTodosApi();

  dispatch({
    type: 'SET_TODOS',
    payload: todos,
  });
};

// CREATE_TODO
export interface CreateTodoAction {
  type: 'CREATE_TODO';
  payload: Todo;
}
export const createTodo = (newTodoContent: string) => async (dispatch: Dispatch) => {
  const newTodo = await createTodoApi(newTodoContent);

  dispatch({
    type: 'CREATE_TODO',
    payload: newTodo,
  });
};

// UPDATE_TODO_STATUS
export interface UpdateTodoStatusAction {
  type: 'UPDATE_TODO_STATUS';
  payload: {
    todoId: string;
    status: TodoStatus;
  };
}
export const updateTodoStatus = (todoId: string, status: TodoStatus) => async (dispatch: Dispatch) => {
  await updateTodoStatusApi(todoId, status);

  dispatch({
    type: 'UPDATE_TODO_STATUS',
    payload: {
      todoId,
      status,
    },
  });
};

// DELETE_TODO
export interface DeleteTodoAction {
  type: 'DELETE_TODO';
  payload: string;
}
export const deleteTodo = (todoId: string) => async (dispatch: Dispatch) => {
  await deleteTodoApi(todoId);

  dispatch({
    type: 'DELETE_TODO',
    payload: todoId,
  });
};

// DELETE_ALL_TODOS
export interface DeleteAllTodosAction {
  type: 'DELETE_ALL_TODOS';
}
export const deleteAllTodos = () => async (dispatch) => {
  await deleteAllTodosApi();

  dispatch({
    type: 'DELETE_ALL_TODOS',
  });
};

// TOGGLE_ALL_TODOS
export interface UpdateAllTodosStatusAction {
  type: 'UPDATE_ALL_TODOS_STATUS';
  payload: TodoStatus;
}
export const updateAllTodosStatus = (status: TodoStatus) => async (dispatch: Dispatch) => {
  await updateAllTodosStatusApi(status);

  dispatch({
    type: 'UPDATE_ALL_TODOS_STATUS',
    payload: status,
  });
};

export interface UpdateTodoContent {
  type: 'UPDATE_TODO_CONTENT';
  payload: {
    todoId: string;
    content: string;
  };
}
export const updateTodoContent = (todoId: string, content: string) => async (dispatch: Dispatch) => {
  await updateTodoContentApi(todoId, content);

  dispatch({ type: 'UPDATE_TODO_CONTENT', payload: { todoId, content } });
};

export type TodoActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | UpdateAllTodosStatusAction
  | UpdateTodoContent;
