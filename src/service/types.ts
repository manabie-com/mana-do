import { Todo } from "../models/todo";
import { Profile } from "../models/user";

export abstract class IAPI {
  abstract authorize(token: string): Promise<Profile>;
  abstract signIn(username: string, password: string): Promise<string>;
  abstract getTodos(): Promise<Array<Todo>>;
  abstract getTodo(id: string): Promise<Todo>;
  abstract updateTodo(id: string, newTodo: Todo): Promise<string>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract deleteTodo(id: string): Promise<string>;
  abstract deleteAllTodos(): Promise<string>;
}
