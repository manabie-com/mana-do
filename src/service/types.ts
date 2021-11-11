import { Todo } from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string): Promise<string>;
    abstract getTodos(): Promise<Array<Todo>>;
    abstract createTodo(content: string): Promise<Todo>;
    abstract setTodos(todo: Todo[]): Promise<void>;
    abstract deleteTodo(id: string): Promise<boolean>;
    abstract deleteAllTodo(): Promise<boolean>;
    abstract updateTodoStatus(id: string, checked: boolean): Promise<boolean>;
    abstract toggleAllTodo(checked: boolean): Promise<boolean>;
    abstract updateTodo(id: string, content: string): Promise<boolean>;
}