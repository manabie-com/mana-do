import { Todo, TodoStatus } from '../models/todo';
import { User } from '../models/user';

export abstract class IAPI {
  abstract getUsers(): Promise<Array<User>>;
  abstract getTodos(userId?: string): Promise<Array<Todo>>;
  abstract createTodo(todo: { userId: string; content: string }): Promise<Todo>;
  abstract updateTodo(id: string, status: TodoStatus): Promise<Todo>;
  abstract deleteTodo(id: string): Promise<Todo>;
  abstract deleteTodos(userId?: string): Promise<Todo>;
}
