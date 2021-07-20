import {Todo, TodoStatus} from '../models/todo';
import { User } from '../models/user';


export interface IAPIres {
        status: number,
        data?:any,
        message?:string
}
export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<IAPIres>
    abstract getTodos() : Promise<IAPIres>
    abstract createTodo(content: String) : Promise<IAPIres>
    abstract updateTodo(todo: Todo) : Promise<IAPIres>
    abstract updateTodoStatus(todo: Todo, status: TodoStatus) : Promise<IAPIres>
    abstract deleteTodo(todo: Todo) : Promise<IAPIres>
    abstract getAuth() : Promise<IAPIres>
    abstract register(user:User) : Promise<IAPIres>
    abstract clearTodos() : Promise<IAPIres>

}