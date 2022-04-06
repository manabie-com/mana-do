import { EnhanceTodoStatus } from "../ToDoPage";

export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface Todo {
  content: string;
  created_date: string;
  status: TodoStatus;
  id: string;
  user_id: string;
  [key: string]: any;
}

export interface CardProps {
  id: string;
  content: string;
  status: TodoStatus;
  showing: EnhanceTodoStatus;
  onUpdateTodoStatus: (status: boolean, todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
}
