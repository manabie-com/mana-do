import { Todo } from '../models/todo';

export interface ApiReponse {
    message: String,
    status: Number
}
export abstract class IAPI {
    abstract signIn(username: string, password: string): Promise<string>
    abstract getTodos(): Promise<Array<Todo>>
    abstract createTodo(content: string): Promise<Todo>
    abstract updateTodoStatus(todoId: string, isCompleted: boolean): Promise<Todo>
    abstract deleteTodo(todoId: string): Promise<ApiReponse>
    abstract deleteAllTodo(): Promise<ApiReponse>
    abstract updateTodoContent(todoId: string, content: string): Promise<Todo>
    abstract toggleAllTodos(isCompleted: boolean): Promise<ApiReponse>
}