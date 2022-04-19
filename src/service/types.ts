import { ITodo } from "../models/todo";

export abstract class IAPI {
  abstract getTodos(): Promise<Array<ITodo>>;
  abstract createTodo(content: string): Promise<ITodo>;
}
