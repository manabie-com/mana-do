import { ITodo } from "../modules/todo/store/todo.constant";
export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<string>;
  abstract verifyToken(token: string): Promise<string>;
  abstract getTodos(): Promise<Array<ITodo>>;
  abstract createTodo(todo: ITodo): Promise<ITodo[]>;
  abstract deleteTodo(id: string): Promise<ITodo[]>;
  abstract updateTodo(id: string, data: Partial<ITodo>): Promise<ITodo[]>;
  abstract updateAllTodos(data: Partial<ITodo>): Promise<ITodo[]>;
}
