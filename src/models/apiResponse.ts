import { Todo } from "./todo";

export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface CreateTodoResponse {
  status: ResponseStatus,
  message?: string,
  data: Todo
}

export interface DeleteTodoResponse {
  status: ResponseStatus,
  message?: string,
  data: Todo
}