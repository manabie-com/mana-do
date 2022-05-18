import { IAPI } from './types';
import { Todo } from '../models/todo';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

class ApiFullstack extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }

    async getTodos(): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return resp.data.data;
    }

    async getData(): Promise<any> {
        const resp = await axios.get<AxiosResponse<any>>(`/tasks`);

        return resp.data.data;
    }
    async updateTodo(todo: Todo, content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }
    async updateStatusTodo(todo: Todo, content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }

}


export default new ApiFullstack();