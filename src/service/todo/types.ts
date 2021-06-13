import {Todo} from "models/todo";

export abstract class ITodo {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
}