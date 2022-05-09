export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export type EnhanceTodoStatus = TodoStatus | "ALL";
export interface Todo {
  content: string;
  created_date: string;
  status: TodoStatus;
  id: string;
  user_id: string;
  number_id: number;
}

export interface TodoList {
  content: string;
  created_date: string;
  status: TodoStatus;
  id: number;
  user_id: string;
  todo_id: string;
}
