import { Dispatch } from "react";
import { AppActions } from "../store/actions";

export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export type EnhanceTodoStatus = TodoStatus | 'ALL';

export interface Todo {
  content: string,
  created_date: string,
  status: string,
  id: string,
  editContent: boolean,
  user_id: string,
}

export interface ComponentProps {
  todos: Todo[],
  dispatch: Dispatch<AppActions>,
  setShowing(ACTIVE: EnhanceTodoStatus): void;
}