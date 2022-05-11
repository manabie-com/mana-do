export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DO = "DO",
  DOING = "DOING",
  URGENT = "URGENT",
  DONOT = "DONOT",
  DONE = "DONE",
  REMOVED = "REMOVED"
}

export interface Todo {
  [key: string]: any
}