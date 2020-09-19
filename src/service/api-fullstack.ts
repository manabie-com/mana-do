import {IAPI} from './types';
import {Todo} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

class ApiFullstack extends IAPI {
    async updateTodoStatus(todoId: string, status: boolean): Promise<boolean> {
        const resp = await axios.put<AxiosResponse<string>>(`/tasks?id=${todoId}&isComplete=${status}`);
        return JSON.parse(resp.data.data);
    }
    async deleteTodo(todoId: string): Promise<boolean> {
        const resp = await axios.delete<AxiosResponse<string>>(`/tasks?id=${todoId}`);
        return JSON.parse(resp.data.data);
    }
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
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks?created_date=${new Date().toISOString().split("T")[0]}`);
        return resp.data.data;
    }
    
}


export default new ApiFullstack();