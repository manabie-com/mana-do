export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export type EnhanceTodoStatus = TodoStatus | "ALL";

export interface ITodoStore {
  [key: string]: Todo;
}

export interface Todo {
  content: string;
}

export interface ITodo {
  content: string;
  created_date: string;
  status: TodoStatus;
  id: string;
  user_id: string;
}
