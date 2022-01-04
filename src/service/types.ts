import { Todo, TodoStatus } from '../models/todo';

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract removeTodo(todo: Todo): Promise<Array<Todo>>;
  abstract updateTodo(todoId: string, content: string, status: TodoStatus): Promise<void>;
}
