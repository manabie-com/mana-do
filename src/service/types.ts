import { Todo, EnhanceTodoStatus } from '../models/todo';

export abstract class IAPI {
    abstract getTodos(status?: EnhanceTodoStatus) : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodoStatus(id: string, status: string) : Promise<void>
    abstract updateManyTodoStatus(ids: string[], status: string) : Promise<void>
    abstract deleteTodo(id: string) : Promise<void>
    abstract deleteAllTodos() : Promise<void>
}