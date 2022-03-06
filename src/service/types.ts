import {Todo} from '../models/todo';

export abstract class IAPI {
  abstract getTodos() : Promise<Array<Todo>>
  abstract createTodo(content: string) : Promise<Todo>
  abstract updateTodo(iid: string, type: string, value: string) : Promise<Todo>
}