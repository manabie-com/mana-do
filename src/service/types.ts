import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(user_id: string, content: string) : Promise<Todo>
    abstract updateTodo(todoId: string, status: string) : Promise<Todo>
    abstract deleteTodo(todoId: string) : Promise<String>
    abstract toggleAllTodos(ids: Array<string>, status: string): void
    abstract onDeleteAllTodos(ids: Array<string>): void
}