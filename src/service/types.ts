import { TodoStatus } from "./../models/todo";
import { Todo } from "../models/todo";


export type EnhanceTodoStatus = TodoStatus;

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
}
