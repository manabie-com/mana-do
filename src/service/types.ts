import {Todo} from '../models/todo';

export abstract class IAPI {
  abstract getTodos() : Promise<Array<Todo>>
  abstract createTodo(content: string) : Promise<Todo>
  abstract setTodo(id: string, status: string) : Promise<Todo>
}