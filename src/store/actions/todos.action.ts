import { getTodos as getTodosApi } from '../../apis/todo';
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
export const getTodos = async (dispatch) => {
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
export interface UpdateAllTodosStatusAction {
  type: 'UPDATE_ALL_TODOS_STATUS';
  payload: TodoStatus;
}
export function updateAllTodosStatus(status: TodoStatus): UpdateAllTodosStatusAction {
  return {
    type: 'UPDATE_ALL_TODOS_STATUS',
    payload: status,
  };
}

export type TodoActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | DeleteAllTodosAction
  | UpdateAllTodosStatusAction;
