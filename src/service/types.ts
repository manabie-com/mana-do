import { Todo } from "models/todo";

export abstract class IAPI {
	abstract getTodos(): Promise<Array<Todo>>;
	abstract createTodo(content: string): Promise<Todo>;
	abstract deleteTodo(id: string): Promise<boolean>;
	abstract batchDelete(ids: string[]): Promise<boolean>;
	abstract findById(id: string): Promise<Todo | null>;
	abstract update(id: string, newData: Partial<Todo>): Promise<boolean>;
}
