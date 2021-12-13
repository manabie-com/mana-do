export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface Todo {
  id: string;
  isEdit?: boolean;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}

export interface UpdateTodo {
  content?: string;
  status?: TodoStatus;
  isEdit?: boolean;
}
