import { Todo, TodoStatus } from '../models/todo';

export const SET_TODOS = 'SET_TODOS';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODOS = 'DELETE_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_TODO_CONTENT = 'UPDATE_TODO_CONTENT';

export interface SetTodosAction {
  type: typeof SET_TODOS;
  payload: Array<Todo>;
}

export function setTodos(todos: Array<Todo>): SetTodosAction {
  return {
    type: SET_TODOS,
    payload: todos,
  };
}

///////////
export interface CreateTodoAction {
  type: typeof CREATE_TODO;
  payload: Todo;
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  };
}

//////////////
export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS;
  payload: {
    todoIds: string[];
    status: TodoStatus;
  };
}

export function updateTodoStatus(
  todoIds: string[],
  status: TodoStatus
): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoIds,
      status,
    },
  };
}
//////////////
export interface UpdateTodoContentAction {
  type: typeof UPDATE_TODO_CONTENT;
  payload: {
    todoId: string;
    content: string;
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

//////////////
export interface DeleteAllTodosAction {
  type: typeof DELETE_TODOS;
  payload: string[];
}

export function deleteTodos(todoIds: string[]): DeleteAllTodosAction {
  return {
    type: DELETE_TODOS,
    payload: todoIds,
  };
}


export type AppActions =
  | SetTodosAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteAllTodosAction
  | UpdateTodoContentAction;
