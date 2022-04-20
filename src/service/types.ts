import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract deleteTodo(todoId: string): Promise<Array<Todo>>
    abstract deleteTodos() : Promise<void>
    abstract updateTodoStatus(todoId: string, checked: boolean): Promise<Array<Todo>>
    abstract updateTodoContent(todoId: string, content: string): Promise<Array<Todo>>
}