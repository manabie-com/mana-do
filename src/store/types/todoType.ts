import { Todo } from "../../models/todo";

export interface ITodoType {
  loading: boolean;
  todos: Array<Todo>;
}
