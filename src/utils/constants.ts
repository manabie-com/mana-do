import { TodoStatus, EnhanceTodoStatus } from "../models/todo";
export interface Tab {
  text: string;
  value: EnhanceTodoStatus;
}

export const LIST_TAB: Tab[] = [
  { text: "All", value: "ALL" },
  { text: "Active", value: TodoStatus.ACTIVE },
  { text: "Completed", value: TodoStatus.COMPLETED },
];
