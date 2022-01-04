import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodoStatus(todoId: string, value: boolean): Promise<any>
    abstract toggleAllTodo(value:boolean): Promise<any>
    abstract deleteTodo(todoId:string): Promise<any>
    abstract deleteAllTodo(): Promise<any>
    abstract updateTodoContent(todoId: string, value: string): Promise<any>

}