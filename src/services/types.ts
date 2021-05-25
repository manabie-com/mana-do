import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>;
    abstract getTodos() : Promise<Array<Todo>>;
    abstract createTodo(content: string) : Promise<Todo>;
    abstract editTodo(todo: Todo) : Promise<boolean>;
    abstract deleteTodo(id: string) : Promise<boolean>;
    abstract deleteAllTodos() : Promise<boolean>;
    abstract toggleAllTodos(checked: boolean) : Promise<boolean>;
}
