import { Dispatch } from "react"
import { AppActions, GET_TODOS } from "../store/actions"

export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum KeydownEvent {
  ENTER = 'Enter',
  ESCAPE = 'Escape'
}

export interface Todo {
  id: string
  created_date: string
  user_id: string
  content: string
  status: TodoStatus
}
export interface GetTodoAction {
  type: typeof GET_TODOS
}

export type EnhanceTodoStatus = TodoStatus | 'ALL';

export interface TodoComponentProps {
  todos: Todo[];
  dispatch: Dispatch<AppActions>;
}

export interface TodoItemProps {
  todo: Todo;
  dispatch: React.Dispatch<AppActions>;
}