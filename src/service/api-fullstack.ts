import { IAPI } from './types';
import { Todo, TodoStatus } from 'src/models/todo';
import axios from 'src/utils/axios';
import { AxiosResponse } from 'axios';

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

    async updateTodo(data: Todo): Promise<Todo> {
        return Promise.resolve(data);
    }

    async updateAllStatusTodo(status: TodoStatus): Promise<string> {
        return Promise.resolve(status);
    }

    async deleteTodo(id: string): Promise<string> {
        return Promise.resolve(id);
    }

    async deleteAllTodo(): Promise<string> {
        return Promise.resolve("Success");
    }

    async getTodos(): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return resp.data.data;
    }
}


export default new ApiFullstack();