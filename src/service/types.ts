import { Todo } from '../models/todo';

export abstract class IAPIFE {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract updateTodoStatus(
    todoId: string,
    checked: boolean
  ): Promise<Array<Todo>>;
  abstract toggleAllTodo(checked: boolean): Promise<Array<Todo>>;
  abstract deleteAllTodo(): Promise<Array<Todo>>;
  abstract deleteTodo(todoId: string): Promise<Array<Todo>>;
  abstract updateTodoContent(
    todoId: string,
    content: string
  ): Promise<Array<Todo>>;
}

export abstract class IAPI {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
}
