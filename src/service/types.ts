import {Todo} from '../models/todo';

export abstract class IAPI {
  abstract getTodos(): Todo[];
  abstract createTodo(content: string): Promise<Todo>;
  abstract persistentTodos(todos: Todo[]): void;
}