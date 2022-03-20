export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export type EnhancedTodoStatus = TodoStatus | "ALL";

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
}
