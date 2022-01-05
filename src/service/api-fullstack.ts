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

    async editTodo(conent: string, id: string): Promise<Todo> {
        const resp = await axios.put<AxiosResponse<Todo>>(`/tasks`, {
            id,
            conent
        });

        return resp.data.data;
    }

    async updateTodoStatus(todoId: string, value: boolean): Promise<{ id: string, value: boolean }> {
        return Promise.resolve({ id: todoId, value })
    }

    async deleteTodo(todoId: string): Promise<any> {
        return Promise.resolve(todoId)
    }

}


export default new ApiFullstack();