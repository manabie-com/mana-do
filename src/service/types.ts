import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<Object>
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(field: any,value : any, id: string) : Promise<Todo>
    abstract deleteTodo(id: string) : Promise<Array<Todo>>
    abstract deleteAllTodo() : Promise<String>
    abstract updateAllTodo(status: boolean) : Promise<String>
}