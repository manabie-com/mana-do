export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {  
  content: string,
  created_date: string,
  status: string,
  id: string,
  user_id: string,
}