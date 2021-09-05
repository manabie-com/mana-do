import { IAPI } from './types';
import { Todo } from '../models/todo';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

class ApiFullstack extends IAPI {
    async signIn(username: string, password: string): Promise<Object> {
        const resp = await axios.get<AxiosResponse<string>>(`/login?user_id=${username}&password=${password}`);

        return resp.data.data
    }

    async createTodo(content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }

    async getTodoList(): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return resp.data.data;
    }

    // NOTE: Only fake handle functions to cross error warning

    async updateTodo(field: any,value : any, id: string): Promise<Todo> {
        const resp = await axios.put<AxiosResponse<Todo>>(`/tasks`, {
            id
        });
        return resp.data.data;
    }
    async deleteTodo(id: string): Promise<Todo[]> {
        return Promise.resolve([])
    }
    async deleteAllTodo(): Promise<String>{
        return Promise.resolve('')
    }
    async updateAllTodo(status: boolean): Promise<String>{
        return Promise.resolve('')
    }
}


export default new ApiFullstack();