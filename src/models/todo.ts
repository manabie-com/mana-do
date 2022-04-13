export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface Todo {
  id: string;
  created_date: string;
  user_id: string;
  content: string;
  status: TodoStatus;
}
