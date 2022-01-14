import {
  CREATE_TODO,
  DELETE_ALL_TODO_LIST,
  DELETE_TODO,
  SET_TODO_LIST,
  TOGGLE_ALL_TODO,
  UPDATE_TODO
} from "../constants/todoAction";
import Todo from "../models/todo";

export interface SetTodoListAction {
  type: typeof SET_TODO_LIST;
  payload: Array<Todo>;
}

export function setTodo(todoList: Array<Todo>): SetTodoListAction {
  return {
    type: SET_TODO_LIST,
    payload: todoList,
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
  payload: Todo;
}

export function updateTodo(todo: Todo): EditTodoAction {
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
}

export type AppActions =
  | SetTodoListAction
  | CreateTodoAction 
  | DeleteTodoAction
  | ClearTodoListAction
  | ToggleAllTodoAction
  | EditTodoAction;
