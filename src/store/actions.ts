import { ITodoItem } from './../models/todo';
import {Todo} from "../models/todo";

export const SET_TODO           = 'SET_TODO';
export const CREATE_TODO        = 'CREATE_TODO';
export const MODIFY_TODO        = 'MODIFY_TODO';
export const DELETE_TODO        = 'DELETE_TODO';
export const DELETE_ALL_TODOS   = 'DELETE_ALL_TODOS';
export const UPDATE_ALL_TODOS   = 'UPDATE_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';


export interface SetTodoAction {
  type    : typeof SET_TODO,
  payload : Array<ITodoItem>
}

export function setTodoList(todoArray: Array<ITodoItem>): SetTodoAction {
  return {
    type    : SET_TODO,
    payload : todoArray
  }
}

///////////
export interface CreateTodoAction {
  type    : typeof CREATE_TODO,
  payload : ITodoItem
}

export function createTodo(newTodo: ITodoItem): CreateTodoAction {

  localStorage.setItem("todoItem", JSON.stringify(newTodo));

  const createTodoAction:CreateTodoAction =  {
    type    : CREATE_TODO,
    payload : newTodo
  }

  return createTodoAction;
}

///////////
export interface ModifyTodoAction {
  type    : typeof MODIFY_TODO,
  payload : ITodoItem
}

export function modifyTodo(todoItem: any): ModifyTodoAction {
  return {
    type    : MODIFY_TODO,
    payload : todoItem
  };
}

//////////////
export interface UpdateTodoStatusAction {
  type    : typeof UPDATE_TODO_STATUS,
  payload : {
    todoId  : string,
    checked : boolean
  }
}

export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  return {
    type    : UPDATE_TODO_STATUS,
    payload : {
      todoId  : todoId,
      checked : checked
    }
  }
}

//////////////
export interface DeleteTodoAction {
  type    : typeof DELETE_TODO,
  payload : string
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type    : DELETE_TODO,
    payload : todoId
  }
}

//////////////
export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS,
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
  }
}

///////////
export interface UpdateAllTodosAction {
  type    : typeof UPDATE_ALL_TODOS,
  payload : boolean
}

export function updateAllTodos(checked: boolean): UpdateAllTodosAction {
  return {
    type    : UPDATE_ALL_TODOS,
    payload : checked
  }
}

export type AppActions =
  SetTodoAction |
  CreateTodoAction |
  ModifyTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  UpdateAllTodosAction;