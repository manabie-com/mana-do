import { Todo } from "../models/todo";

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<string>;
  abstract getTodos(): Promise<Array<Todo>>;
  abstract deleteAllTodo(): Promise<boolean>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract updateTodo(todoId: string, name: string, value: any): Promise<Todo>;
}
