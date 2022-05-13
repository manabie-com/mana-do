import { Todo } from '../models/todo';

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract updateTodoStatus(id: string, checked: boolean): Promise<void>;
  abstract deleteTodo(id: string): Promise<void>;
  abstract toggleAllTodos(checked: boolean): Promise<void>;
  abstract deleteAllTodos(): Promise<void>;
  abstract editTodo(id: string, content: string): Promise<void>;
}
