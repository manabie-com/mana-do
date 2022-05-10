import {Todo, TodoStatus} from '../models/todo';
import {TResponse} from "./utils";

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(todId: string, content: string) : Promise<TResponse>
    abstract removeTodo(todId: string) : Promise<TResponse>
    abstract updateStatusTodo(todId: string, status: TodoStatus) : Promise<TResponse>
}