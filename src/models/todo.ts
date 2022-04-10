import { AppActions } from 'store/actions';

export interface AppState {
  todos: Array<Todo>,
  filter: string,
}

export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ALL = 'ALL'
}

export interface Todo {
  [key: string]: any
}

export type TodoType = {
  todos: Array<Todo>,
  filter: string,
  dispatch: React.Dispatch<AppActions>
}