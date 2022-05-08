import {
  SET_TODO,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_ALL_TODOS,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from "./action-types";

import {
  SetTodoAction,
  CreateTodoAction,
  UpdateTodoStatusAction,
  DeleteTodoAction,
  DeleteAllTodosAction,
  ToggleAllTodosAction,
  UpdateTodoContentAction,
} from "./actions";

import { Todo, TTodoStatus } from "models";

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos,
  };
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  };
}

export function updateTodoStatus(
  todoId: string,
  status: TTodoStatus
): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      status,
    },
  };
}

export function updateTodoContent(
  todoId: string,
  content: string
): UpdateTodoContentAction {
  return {
    type: UPDATE_TODO_CONTENT,
    payload: {
      todoId,
      content,
    },
  };
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
  };
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked,
  };
}
