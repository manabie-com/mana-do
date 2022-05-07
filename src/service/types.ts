import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(id: string, content: string, status: string) : Promise<Todo>
    abstract deleteTodo(id: string) : Promise<Todo>
}