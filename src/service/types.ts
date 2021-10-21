import { Todo } from "../models/todo";

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<string>;
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract updateTodo(todos: Array<Todo>): Promise<boolean>;
  abstract deleteAll(): Promise<boolean>;
}
