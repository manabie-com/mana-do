import { Todo } from '../models/todo';

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract updateTodo(todo: Todo): Promise<Todo>;
  abstract deleteAllTodos(): Promise<boolean>;
  abstract deleteTodo(todoId: string): Promise<boolean>;
  abstract toggleAllTodos(checked: boolean): Promise<boolean>;
}
