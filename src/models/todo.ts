import { AppActions } from 'store/actions';

export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  [key: string]: any
}

export type TodoType = {
  todos: Array<Todo>,
  dispatch: React.Dispatch<AppActions>
}