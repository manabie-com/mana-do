import { AxiosResponse } from 'axios';
import { Todo } from '../models/todo';
import axios from '../utils/axios';
import { IAPI } from './types';

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
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return resp.data.data;
    }

    async updateTodoStatus(todoId: string, completed: boolean): Promise<Todo[]> {
        return Promise.resolve([]);
    }
    async updateTodo(todoId: string, content: string): Promise<Todo[]> {
        return Promise.resolve([]);
    }
    async toggleAllTodos(completed: boolean): Promise<Todo[]> {
        return Promise.resolve([]);
    }
    async deleteTodo() {
        return Promise.resolve([]);
    }
    async deleteAllTodos(): Promise<Todo[]> {
        return Promise.resolve([]);
    }
}


export default new ApiFullstack();