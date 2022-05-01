import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(data: Todo) : Promise<Todo>
    abstract deleteTodo(id: string) : Promise<Todo>
}