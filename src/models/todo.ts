export enum TodoStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed'
}

export interface Todo {
  id: string
  user_id: string
  content : string
  status: TodoStatus
  created_date: string
}