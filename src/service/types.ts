import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(todo: Todo): Promise<Todo>
    abstract toggleAllTodo(checked: boolean) : Promise<Array<Todo>>
    abstract deleteTodo(todoId: string) : Promise<Array<Todo>>
    abstract deleteAllTodo(): Promise<[]>
}