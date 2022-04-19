export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  content: string,
  created_date: string,
  status: string,
  id: string,
  editContent: boolean,
  user_id: string,
}