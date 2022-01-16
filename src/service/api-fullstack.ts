import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {successResponse} from '../utils/constant'
import {AxiosResponse} from 'axios';

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

    async updateTodo(id: string, todo: Partial<Omit<Todo, 'id'>>) {
        const resp = await axios.put<AxiosResponse<typeof successResponse>>(`/tasks/${id}`, {
            todo
        });
        return resp.data.data;
    }

    async removeTodo(id: string) {
        const resp = await axios.delete<AxiosResponse<typeof successResponse>>(`/tasks/${id}`);
        return resp.data.data;
    }

    async removeAllTodo() {
        const resp = await axios.delete<AxiosResponse<typeof successResponse>>(`/tasks`);
        return resp.data.data;
    }

    async changeTodosStatus(status: TodoStatus) {
        return Promise.resolve(successResponse)
    }
}


export default new ApiFullstack();