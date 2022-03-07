import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract getTodos(): Promise<Array<Todo>>

    abstract updateTodos(todos: Array<Todo>): Promise<any>

    abstract createTodo(content: string): Promise<Todo>
}
