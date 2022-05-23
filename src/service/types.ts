import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract createUpdateTodo(content: string, todoId: string, status: TodoStatus) : Promise<Todo>
}