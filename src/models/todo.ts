export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  [key: string]: any
}

export enum TodoUpdateType {
  CONTENT = 'CONTENT',
  ISEDIT = 'ISEDIT',
  STATUS = 'STATUS'
}