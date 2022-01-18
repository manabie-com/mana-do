import {Todo, TodoStatus} from '../models/todo';

export type ParamsUpdateTodo = Partial<Omit<Todo, 'id'>>
export type ParamsLogin = {
    username: string
    password: string
}
export type ApiResponse = {
    success: boolean
    message: string
}
export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(id: string, todo: ParamsUpdateTodo): Promise<ApiResponse>
    abstract removeTodo(id: string): Promise<ApiResponse>
    abstract removeAllTodo(): Promise<ApiResponse>
    abstract changeTodosStatus(status: TodoStatus): Promise<ApiResponse>
    abstract login(formData: ParamsLogin): Promise<ApiResponse>
    abstract logout(): Promise<ApiResponse>
}
