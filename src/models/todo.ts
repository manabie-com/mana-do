export enum TodoStatus {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export enum KeyCode {
  ENTER_KEY = 13,
  ESCAPE_KEY = 27,
}

export interface Todo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}
