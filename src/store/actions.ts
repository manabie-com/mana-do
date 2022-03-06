import {Todo} from "../models/todo";

export const GET_TODOS = 'GET_TODOS';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';


export interface SetTodoAction {
  type: typeof GET_TODOS,
  payload: Array<Todo>
}

export function getTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: GET_TODOS,
    payload: todos
  }
}

///////////
export interface CreateTodoAction {
  type: typeof CREATE_TODO,
  payload: Todo
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo
  }
}

//////////////
export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO,
  payload: Todo
}

export function updateTodoStatus(todoId: string, updatedTodo: Todo): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO,
    payload: {
      todoId,
      updatedTodo
    }
  }
}

//////////////
export interface DeleteTodoAction {
  type: typeof DELETE_TODO,
  payload: string
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId
  }
}

export type AppActions =
  SetTodoAction |
  CreateTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction;