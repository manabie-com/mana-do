import { Todo } from "../models/todo"

export abstract class IAPI {
	abstract getTodos(): Promise<Array<Todo>>
	abstract createTodo(content: string): Promise<Todo>
	abstract deleteTodo(id: string): Promise<boolean>
	abstract deleteTodoAll(): Promise<boolean>
	abstract toggleAll(isChecked: boolean): Promise<boolean>
	abstract toggleTodo(id: string, isChecked: boolean): Promise<boolean>
	abstract updateTodoContent(todoId: string, content: string): Promise<boolean>
}
