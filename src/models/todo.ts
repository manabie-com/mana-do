export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum LocalKey {
  TODO_LIST = 'todo_list'
}

export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
  updated_date: string
}