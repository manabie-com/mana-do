import { Todo } from "../store/models";

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
}
