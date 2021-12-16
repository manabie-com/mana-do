import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';
import { CreateTodoResponse, DeleteTodoResponse } from '../models/apiResponse';

class ApiFullstack extends IAPI {
    async createTodo(content: string): Promise<CreateTodoResponse> {
        const resp = await axios.post<AxiosResponse<CreateTodoResponse>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }

    async updateTodo(data: {todoId: string, content?: string, status?: TodoStatus}): Promise<CreateTodoResponse> {
        const resp = await axios.post<AxiosResponse<CreateTodoResponse>>(`/tasks`, {
            
        });

        return resp.data.data;
    }

    async getTodos(): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return resp.data.data;
    }

    async deleteTodo(todoId: string) : Promise<DeleteTodoResponse> {
        const resp = await axios.get<AxiosResponse<DeleteTodoResponse>>(`/tasks`);

        return resp.data.data;
    }
}


export default new ApiFullstack();