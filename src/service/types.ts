import { Todo } from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string): Promise<string>
    abstract getTodos(): Promise<Array<Todo>>
    abstract createTodo(content: string): Promise<Todo>
    abstract updateTodoStatus(todoId: string, completed: boolean): Promise<Todo[]>
    abstract updateTodo(todoId: string, content: string): Promise<Todo[]>
    abstract toggleAllTodos(completed: boolean): Promise<Todo[]>
    abstract deleteTodo(todoId: string): Promise<Todo[]>
    abstract deleteAllTodos(): Promise<Todo[]>
}