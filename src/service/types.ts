import {Todo} from '../models/todo';
import {User} from '../models/user'

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<User>
    abstract getTodos(username: string) : Promise<Array<Todo>>
    abstract deleteAllToDo(username: string) : Promise<Array<Todo>| []>
    abstract createTodo(content: string, username: string) : Promise<Todo>
    abstract updateListToDo(username: string, listToDo: Todo[]): Promise<Todo[] | []>
}