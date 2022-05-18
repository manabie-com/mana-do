import { Todo, TodoStatus } from 'models/todo';

export abstract class IAPI {
	abstract getTodos(): Promise<Array<Todo>>;
	abstract createTodo(content: string): Promise<Todo>;
	abstract updateTodo(todoId: string, dataUpdate: { content?: string; status?: TodoStatus }): Promise<boolean>;
	abstract deleteAllTodos(): Promise<boolean>;
	abstract deleteTodo(todoId: string): Promise<boolean>;
}
