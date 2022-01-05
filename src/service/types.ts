import { Todo } from "../models/todo";

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract deleteTodo(todoId: string): Promise<string>;
  abstract deleteAllTodos(): Promise<void>;
  abstract updateTodo(todo: Todo): Promise<Todo>;
}
