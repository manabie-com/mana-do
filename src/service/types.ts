import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodoStatus(id: any, checked: boolean) : Promise<Todo>
    abstract toggleAllTodos(checked: boolean) : Promise<Todo>
    abstract deleteTodo(id: any) : Promise<Todo>
}