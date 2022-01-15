import {successResponse} from '../utils/constant'

import {Todo} from '../models/todo';

export type ParamsUpdateTodo = Partial<Omit<Todo, 'id'>>
export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract updateTodo(id: string, todo: ParamsUpdateTodo): Promise<typeof successResponse>
    abstract removeTodo(id: string): Promise<typeof successResponse>
    abstract removeAllTodo(): Promise<typeof successResponse>
}
