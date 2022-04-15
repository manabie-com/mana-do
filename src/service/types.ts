import { Todo, TodoStatus, UpdateTodoData } from '../models/todo';

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract updateTodo(todoId: string, data: UpdateTodoData): Promise<Todo>;
  abstract deleteTodo(todoId: string): Promise<void>;
  abstract deleteAllTodos(): Promise<void>;
  abstract toggleAllTodos(todoIds: string[], status: TodoStatus): Promise<void>;
}
