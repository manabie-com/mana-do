export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

// change type for Todo
export interface Todo {
  // [key: string]: any
  content: string;
  id: string;
  status: TodoStatus;
  user_id: string;
  created_date: string;
}
