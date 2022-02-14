import { Todo } from '../models/todo';

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract deleteTodo(id: string): Promise<void>;
  abstract deleteAllTodos(): Promise<void>;
  abstract updateTodoStatus(id: string, completed: boolean): Promise<void>;
}
