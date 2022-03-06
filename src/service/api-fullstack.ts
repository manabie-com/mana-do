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

    async deleteTodo(id: string): Promise<void> {

    }

    async updateTodo(id: string, checked: boolean): Promise<void> {

    }

    async toggleAllTodo(checked: boolean): Promise<void> {

    }

    async deleteAllTodo(): Promise<void> {

    }

    async editTodo(id: string, content: string): Promise<void> {

    }
}


export default new ApiFullstack();