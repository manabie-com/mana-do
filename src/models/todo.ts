import { EnhanceTodoStatus } from '../ToDoPage';

export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}
export enum TodoFilter {
  ALL = "ALL",
}
export interface Todo {
  content: string;
  created_date: string;
  status: EnhanceTodoStatus;
  id: string;
  user_id: string;
  toggle: boolean;
}
