import { Constants } from "../constants";

export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface Todo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}

export type EnhanceTodoStatus = TodoStatus | typeof Constants.ALL;
