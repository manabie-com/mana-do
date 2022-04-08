import { AppActions } from "../store/actions";
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
  currentEdit: string;
  onUpdateTodoStatus: (status: boolean, todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
  onEditTodo: (todoId: string, content: string) => void;
  changeEditMode: (todoId: string) => void;
  dispatch: (value: AppActions) => void;
}
