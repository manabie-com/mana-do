import { Todo, TodoStatus } from "../models/todo";

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract deleteTodo(todo: Todo): Promise<Todo[]>;
  abstract deleteAllTodos(): Promise<void>;
  abstract toggleAllTodos(todos: Todo[], status: TodoStatus): Promise<Todo[]>;
  abstract updateTodo(todo: Todo): Promise<Todo[]>;
}
