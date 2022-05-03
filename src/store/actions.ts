import {
  CreateTodoAction,
  DeleteAllTodosAction,
  DeleteTodoAction,
  ToggleAllTodosAction,
  UpdateTodoContentAction,
  UpdateTodoStatusAction,
} from "./action.model";
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from "./constant";
import { Todo } from "./models";

// create todo

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  };
}

// update todo status

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
  };
}

// update todo content

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

// delete Todo

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
}

// Delete all todos

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
  };
}

// Toggle all todos
export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked,
  };
}

export type AppActions =
  | CreateTodoAction
  | UpdateTodoStatusAction
  | UpdateTodoContentAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction;
