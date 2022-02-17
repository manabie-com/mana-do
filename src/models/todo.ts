export enum TodoStatus {
  ACTIVE = 1,
  COMPLETED = 2,
}

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  createdDate: string;
  userId: string;
}
