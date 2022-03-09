import { Todo } from 'models/todo';

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<string>;
  abstract verifyToken(token: string): Promise<void>;
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
}
