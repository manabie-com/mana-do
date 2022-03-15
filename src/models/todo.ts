export enum TodoStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  [key: string]: any
  id: string
  user_id: string
  content: string
  status?: TodoStatus
  created_date: string
}