export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  created_date: string;
  user_id: string;
}
