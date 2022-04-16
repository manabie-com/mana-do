import { Todo } from '../models/todo';

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract deleteTodo(id: string): Promise<Todo | null>;
  abstract deleteAllTodos(): Promise<Todo[]>;
  abstract updateTodo(id: string, todo: Partial<Todo>): Promise<Todo | null>;
  abstract toggleAllTodos(checked: boolean): Promise<Todo[]>;
}
