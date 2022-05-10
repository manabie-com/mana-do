export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ALL = "ALL",
  IMPORTANT = "IMPORTANT"
}

export interface Todo {
  [key: string]: any
}