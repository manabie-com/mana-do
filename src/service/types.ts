import { Todo, TodoStatus } from '../models/todo';

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract updateTodo(id: string, status: TodoStatus): Promise<Partial<Todo>>;
  abstract deleteTodo(id: string): Promise<string>;
  abstract deleteAllTodos(): Promise<string>;
  abstract toggleAllTodos(checkAll: boolean): Promise<string>;
}
