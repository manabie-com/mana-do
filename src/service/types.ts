import { Todo } from '../models/todo';

export abstract class IAPI {
    abstract getTodos(): Promise<Array<Todo>>
    abstract createTodo(content: string): Promise<Todo>
    abstract deleteTodo(id: string): Promise<string>
    abstract editTodo(content: string, id: string): Promise<Todo>
    abstract updateTodoStatus(todoId: string, value: boolean): Promise<{ id: string, value: boolean }>

}