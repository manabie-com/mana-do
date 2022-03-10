import { IAPI } from './types';
import { Todo, EnhanceTodoStatus, TodoStatus } from '../models/todo';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

class ApiFullstack extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }

    async getTodos(status?: EnhanceTodoStatus): Promise<Array<Todo>> {
        let url = '/tasks';
        status = status ?? 'ALL';
        if (status in TodoStatus)
            url += `?status=${status}`;

        const resp = await axios.get<AxiosResponse<Array<Todo>>>(url);

        return resp.data.data;
    }

    async updateTodoStatus(id: string, status: string): Promise<void> {
        await axios.put(`/tasks`, {
            id,
            status,
        });
    }

    async updateManyTodoStatus(ids: string[], status: string): Promise<void> {
        await axios.put(`/many-tasks`, {
            ids,
            status,
        });
    }

    async deleteTodo(id: string): Promise<void> {
        await axios.delete(`/tasks/${id}`);
    }

    async deleteAllTodos(): Promise<void> {
        await axios.delete(`/tasks`);
    }
}


export default new ApiFullstack();