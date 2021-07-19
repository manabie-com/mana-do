import {Todo} from '../../models/todo';
import { ApiResponseType } from '../types';

export abstract class ITodoService
{
    abstract getTodos() : Promise<ApiResponseType<Array<Todo>>>
    abstract createTodo(content: string) : Promise<ApiResponseType<Todo>>
}