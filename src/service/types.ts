import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo[]>
    abstract updateTodo(todo: Partial<Todo>) : Promise<Todo[]>
    abstract deleteTodo(id: string) : Promise<Todo[]>
    abstract deleteAllTodos() : Promise<Todo[]>
    abstract toggleAllTodos(status: TodoStatus) : Promise<Todo[]>
    abstract updateTodoStatus(todo: Partial<Todo>) : Promise<Todo[]>
    abstract verifyToken(token: string): Promise<string>;
}