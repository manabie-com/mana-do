import { Todo } from "../models/todo";
import { User } from "../models/user";

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<string>;
  abstract getUser(token: string): Promise<User>;
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string, user_id: string): Promise<Todo>;
  abstract removeTodo(todoId: string): Promise<Todo>;
}
