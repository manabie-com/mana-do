import { Todo } from '../models/todo';

export abstract class IAPI {
    abstract getTodos(): Promise<Array<Todo>>
    abstract createTodo(content: string): Promise<Todo>
    abstract deleteTodo(id: string): Promise<void>
    abstract updateTodo(id: string, checked: boolean): Promise<void>
    abstract toggleAllTodo(checked: boolean): Promise<void>
    abstract deleteAllTodo(): Promise<void>
    abstract editTodo(id: string, content: string): Promise<void>
}