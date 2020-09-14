import { IAPI } from './types';
import { Todo } from '../models/todo';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

class ApiFullstack extends IAPI {
    async signIn(username: string, password: string): Promise<string> {
        const resp = await axios.post<AxiosResponse<string>>(`/login`, { user_id: username, password });
        return resp.data.data
    }

    async createTodo(content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content
        });
        return resp.data.data;
    }

    async getTodos(params: any): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);
        return resp.data.data;
    }

    async deleteTodo(todoId: string): Promise<string> {
        return Promise.resolve("success");
    }

    async updateTodoStatus(todoId: string, checked: boolean): Promise<string> {
        return Promise.resolve("success");
    }

    async deleteAllTodo(): Promise<string> {
        return Promise.resolve("success");
    }

    async updateAllTodo(checked: boolean): Promise<string> {
        return Promise.resolve("success");
    }

    async updateTodo(todoId: string, value: string): Promise<string> {
        return Promise.resolve("success");
    }

}


export default new ApiFullstack();