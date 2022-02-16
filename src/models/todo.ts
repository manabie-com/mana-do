export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export type Status = TodoStatus | 'ALL';
export interface Todo {
  [key: string]: any
}