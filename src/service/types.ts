import { Todo, Response } from "../models/todo";

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<Response>;
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
}
