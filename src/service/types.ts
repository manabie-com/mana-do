import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(id:string, content?: string | undefined, status?: TodoStatus | undefined) : Promise<Todo>
    abstract removeTodo(id:string) : Promise<string>
    abstract updateTodos(todos: Todo[]) : Promise<Todo[]>
}