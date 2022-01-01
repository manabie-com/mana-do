import { Todo } from '../models/todo';

export abstract class IAPI {
    abstract getTodos(): Promise<Todo[]>
    abstract createTodo(content: string): Promise<Todo>
    abstract deleteTodo(id: string): Promise<void>
    abstract deleteAllTodos(): Promise<void>
    abstract updateTodoContent(id: string, content: string): Promise<void>
    abstract updateTodoStatus(id: string, checked: boolean): Promise<void>
    abstract toggleAllTodos(checked: boolean): Promise<void>
}