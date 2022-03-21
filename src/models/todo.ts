export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ALL = "ALL"
}

export interface Todo {
  todo: any;
  status: TodoStatus;
  content: string;
  id: string;
  user_id: string;
  created_date: string;
}