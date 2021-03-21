import { Todo } from "../../models/todo";

export interface ITodoType {
  todos: Array<Todo>;
  refreshTrigger?: any; // Trigger refresh on changed
}
