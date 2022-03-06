export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DELETED = 'DELETED'
}

export interface Todo {
  [key: string]: any
}