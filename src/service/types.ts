import {Todo} from '../models/todo';

export abstract class IAPI {
    // abstract getTodos() : Promise<Array<Todo>>
    // abstract createTodo(content: string) : Promise<Todo>
    abstract getTodos() : any
    abstract createTodo(content: string) : any
}