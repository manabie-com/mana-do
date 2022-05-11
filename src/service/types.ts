import { Todo } from '../models/todo';

export abstract class IAPI {
    abstract getTodos(): Promise<Array<Todo>>
    abstract createTodo(content: string): Promise<Todo>
    abstract getData(): Promise<any>
    abstract updateTodo(todo: Todo, content: string): Promise<Todo>
    abstract updateStatusTodo(todo: Todo, content: string): Promise<Todo>
}