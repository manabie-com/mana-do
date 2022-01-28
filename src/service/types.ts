import { Todo } from "../models/todo";


export abstract class IAPI {
    abstract login(username: string, password: string) : Promise<any>
    abstract register(username: string, password: string) : Promise<any>
    abstract getTodos() : Promise<any>
    abstract createTodo(content: string) : Promise<any>
    abstract editTodo(content: string, status: string, todoId: string) : Promise<any>
    abstract deleteTodo(todoId: string) : Promise<any>
    abstract deleteAllTodo(todoIds: Array<string>) : Promise<any>
    abstract toggleAllTodos(todo: Array<Todo>, status: string) : Promise<any>
}