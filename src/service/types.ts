import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodoStatus(id:string, status: boolean) : Promise<boolean>
    abstract updateAllTodosStatus(status: boolean) : Promise<boolean>
    abstract deleteTodo(id:string) : Promise<boolean>
    abstract deleteAllTodos() : Promise<boolean>
}