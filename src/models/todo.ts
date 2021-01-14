export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}
export enum TodoFilters {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ALL = 'ALL'
}
export interface Todo {
  id: string
  user_id: string
  content: string
  status?: TodoStatus
  created_date: string
}