export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export type EnhanceTodoStatus = TodoStatus | 'ALL';

export interface Todo {
  [key: string]: any
}