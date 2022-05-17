import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract editTodo(id: string, newContent: string | boolean) : Promise<boolean>
}