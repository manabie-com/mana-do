import { ITodoItem, Todo } from './../models/todo';

export abstract class IAPI {
    abstract getTodoList() : Promise<Array<ITodoItem>>
    abstract createTodoItem(todoItem: ITodoItem) : Promise<ITodoItem>
    abstract ModifyTodoItem(todoItem: ITodoItem) : Promise<ITodoItem>
}