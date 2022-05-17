export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  [key: string]: any
}

export interface ITodoItem {
  content     : String,
  created_date: String,
  status      : String,
  id          : String,
  user_id     : String,
}
