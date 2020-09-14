import { Todo } from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string): Promise<string>
    abstract getTodos(params: any): Promise<Array<Todo>>
    abstract createTodo(content: string): Promise<Todo>
    abstract deleteTodo(todoId: string): Promise<string>
    abstract updateTodoStatus(todoId: string, checked: boolean): Promise<string>
    abstract deleteAllTodo(): Promise<string>
    abstract updateAllTodo(checked: boolean): Promise<string>
    abstract updateTodo(todoId: string, value: string): Promise<string>
}