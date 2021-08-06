import {IAPI} from './types';
import {Todo, UpdatedTodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

class ApiFullstack extends IAPI {
    async signIn(username: string, password: string): Promise<string> {
        const resp = await axios.get<AxiosResponse<string>>(`/login?user_id=${username}&password=${password}`);

        return resp.data.data
    }

    async createTodo(content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }

    async updateTodo(content: string): Promise<Todo> {
        const resp = await axios.put<AxiosResponse<Todo>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }
    async updateTodoStatus(id: string, checked: boolean): Promise<UpdatedTodoStatus> {
        const resp = await axios.put<AxiosResponse<UpdatedTodoStatus>>(`/tasks`, {
            id,
            checked
        });

        return resp.data.data;
    }

    async getTodos(): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return resp.data.data;
    }
}


export default new ApiFullstack();