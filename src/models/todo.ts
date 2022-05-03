export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ALL = 'ALL',
  DELETE='DELETE'
}

export interface Todo {
  [key: string]: any,
}