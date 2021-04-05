import { Todo, TodoStatus } from 'src/models/todo';

export abstract class IAPI {
	abstract signIn(username: string, password: string): Promise<string>
	abstract getTodos(): Promise<Array<Todo>>
	abstract createTodo(content: string): Promise<Todo>
	abstract updateTodo(data: Todo): Promise<Todo>
	abstract updateAllStatusTodo(status: TodoStatus): Promise<string>
	abstract deleteTodo(id: string): Promise<string>
	abstract deleteAllTodo(): Promise<string>
}