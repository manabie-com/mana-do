import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract deleteTodo(id: string): Promise<boolean>;
    abstract deleteAll(): Promise<boolean>;
    abstract toggleAllTodo(checked: boolean): Promise<boolean>;
    abstract editTodoStatus(id: string, status: string) : Promise<boolean>;
    abstract editTodo(id: string, content: string) : Promise<boolean>;
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract signIn(username: string, password: string) : Promise<string>
}