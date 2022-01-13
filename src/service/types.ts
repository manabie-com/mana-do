import Todo from '../models/todo';

export abstract class IAPI {
    abstract getTodoList() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
}