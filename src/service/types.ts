import { CreateTodoResponse, DeleteTodoResponse } from '../models/apiResponse';
import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<CreateTodoResponse>
    abstract updateTodo(data:{todoId: string, content?: string, status?: TodoStatus}) : Promise<CreateTodoResponse>
    abstract deleteTodo(todoId: string) : Promise<DeleteTodoResponse>
}