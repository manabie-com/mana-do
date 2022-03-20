export enum TodoStatus {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface Todo {
  id: string;
  user_id: string;
  content: string;
  status: TodoStatus;
  created_date: string;
  updated_date: string;
}

export interface CreateTodoDto extends Pick<Todo, "content"> {}

export interface UpdateTodoDto extends Partial<Pick<Todo, "id" | "content" | "status">> {
  id: string;
}

export interface ToggleAllTodosDto extends Pick<Todo, "status"> {}

export interface DeleteTodoDto extends Pick<Todo, "id"> {}
