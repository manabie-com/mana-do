export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  id: string;
  status: string;
  content: string;
  created_date: string;
  user_id: string;
}