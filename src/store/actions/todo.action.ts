import { Todo } from '../../models/todo';

// GET_TODO
export interface SetTodoAction {
  type: 'GET_TODOS';
}
export function getTodos(): SetTodoAction {
  return {
    type: 'GET_TODOS',
  };
}

// CREATE_TODO
export interface CreateTodoAction {
  type: 'CREATE_TODO';
  payload: Todo;
}
export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: 'CREATE_TODO',
    payload: newTodo,
  };
}

// UPDATE_TODO_STATUS
export interface UpdateTodoStatusAction {
  type: 'UPDATE_TODO_STATUS';
  payload: {
    todoId: string;
    checked: boolean;
  };
}
export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  return {
    type: 'UPDATE_TODO_STATUS',
    payload: {
      todoId,
      checked,
    },
  };
}

// DELETE_TODO
export interface DeleteTodoAction {
  type: 'DELETE_TODO';
  payload: string;
}
export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: 'DELETE_TODO',
    payload: todoId,
  };
}

// DELETE_ALL_TODOS
export interface DeleteAllTodosAction {
  type: 'DELETE_ALL_TODOS';
}
export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: 'DELETE_ALL_TODOS',
  };
}

// TOGGLE_ALL_TODOS
export interface ToggleAllTodosAction {
  type: 'TOGGLE_ALL_TODOS';
  payload: boolean;
}
export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: 'TOGGLE_ALL_TODOS',
    payload: checked,
  };
}

export type TodoActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | ToggleAllTodosAction;
