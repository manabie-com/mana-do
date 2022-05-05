import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodoStatus(todoId: string, status: TodoStatus) : Promise<void>
    abstract onToggleAllTodo(checked: boolean) : Promise<void>
    abstract onDeleteAllTodo() : Promise<void>
    abstract onDeleteTodo(todoId: string) : Promise<void>
    abstract onUpdateTodoContent(todoId: string, content: string) : Promise<void>
}
