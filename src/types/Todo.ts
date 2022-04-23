export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  ALL = "ALL",
}

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  created_date?: string;
  user_id?: string;
}
