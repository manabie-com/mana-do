import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(item: Todo) : Promise<Todo>
    abstract deleteTodo(todoId: string) : Promise<any>
    abstract toggleAll(isActive: boolean): Promise<any>
    abstract deleteAll(userId: string): Promise<any>
}