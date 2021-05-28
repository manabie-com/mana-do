import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract deleteTodoItem(todoId: string) : Promise<void>
    abstract clearTodo() : Promise<void>
    abstract updateTodoItemContent(todo: Todo): Promise<void>
    abstract updateTodoStatus(todoList: Todo[]): Promise<Todo[]>
}
