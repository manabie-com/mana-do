import { UserProfile } from '../models/profile';
import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getProfile(): Promise<UserProfile>;
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
}