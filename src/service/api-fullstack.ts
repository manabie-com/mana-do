import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
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

    async getTodos(): Promise<Array<Todo>> {
        const today = new Date().toDateString();
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks?created_date=${today}`);
        return resp.data.data;
    }

    async updateTodoStatus(id: string, status: boolean): Promise<boolean> {
        const resp = await axios.patch<AxiosResponse<Todo>>(`/tasks/${id}?status=${status}`);

        return resp.status == 200;
    }

    async updateAllTodosStatus(status: boolean): Promise<boolean>{
        const today = new Date().toDateString();
        const resp = await axios.patch<AxiosResponse<null>>(`/tasks?created_date=${today}&status=${status}`);

        return resp.status == 200;
    }

    async deleteTodo(id: string): Promise<boolean>{
        const resp = await axios.delete<AxiosResponse<null>>(`/tasks/${id}`);

        return resp.status == 200;
    }

    async deleteAllTodos(): Promise<boolean>{
        const today = new Date().toDateString();
        const resp = await axios.delete<AxiosResponse<null>>(`/tasks?created_date=${today}`);

        return resp.status == 200;
    }
}


export default new ApiFullstack();