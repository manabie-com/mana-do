export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  NEW = 'NEW',
}

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  createdDate: string;
  userId: string;
}