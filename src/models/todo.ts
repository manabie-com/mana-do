import { EnhanceTodoStatus } from "../service/types";

export const STORAGE_TODO = "todoList";

export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  ALL = "ALL",
}

export interface Todo {
  [key: string]: any;
}
export interface TodoItem extends Todo {
  isShowing: EnhanceTodoStatus;
  onUpdateTodoStatus: React.ChangeEventHandler<HTMLInputElement>;
  onDeleteTodo: React.MouseEventHandler<HTMLButtonElement>;
}
