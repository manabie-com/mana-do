import { TodoStatus } from "models/todo";

export const tabsList = [
  { id: 1, label: "All", value: "ALL" },
  { id: 2, label: "Active", value: TodoStatus.ACTIVE },
  { id: 3, label: "Completed", value: TodoStatus.COMPLETED },
]