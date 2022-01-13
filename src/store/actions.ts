import {
  CREATE_TODO,
  DELETE_ALL_TODO_LIST,
  DELETE_TODO,
  SET_TODO_LIST,
  TOGGLE_ALL_TODO,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
} from "../constants/todoAction";
import Todo from "../models/todo";

export interface SetTodoAction {
  type: typeof SET_TODO_LIST;
  payload: Array<Todo>;
}

export function setTodo(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO_LIST,
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
    todoId: string;
    checked: boolean;
  };
}

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

//////////////
export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
}

//////////////
export interface ClearTodoListAction {
  type: typeof DELETE_ALL_TODO_LIST;
}

export function clearTodoList(): ClearTodoListAction {
  return {
    type: DELETE_ALL_TODO_LIST,
  };
}

///////////
export interface ToggleAllTodoAction {
  type: typeof TOGGLE_ALL_TODO;
  payload: boolean;
}

export function toggleAllTodo(checked: boolean): ToggleAllTodoAction {
  return {
    type: TOGGLE_ALL_TODO,
    payload: checked,
  };
}

export interface EditTodoAction {
  type: typeof UPDATE_TODO;
  payload: {
    todoId: string;
    content: string;
  };
}

export function updateTodo(todoId: string, content: string): EditTodoAction {
  return {
    type: UPDATE_TODO,
    payload: {
      todoId,
      content,
    },
  };
}

export type AppActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | DeleteTodoAction
  | ClearTodoListAction
  | ToggleAllTodoAction
  | EditTodoAction;
