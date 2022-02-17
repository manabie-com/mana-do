export enum TodoStatus {
  ACTIVE = 1,
  COMPLETED = 2,
}

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  created_date: string;
  user_id: string;
}
