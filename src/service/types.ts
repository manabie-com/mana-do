import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateStatus(id: string, status: TodoStatus):   Promise<boolean>
    abstract clearAllTodo(): Promise<boolean>
    abstract clearTodo(id: string) : Promise<boolean>
    abstract updateTodo(id: string, content: string) : Promise<boolean>
}