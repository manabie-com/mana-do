import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

class ApiFullstack extends IAPI {
    async authorize(token: string): Promise<void> {
        await axios.get<AxiosResponse<void>>(`/authorize`, {
            headers: {
                Authorization: token
            }
        });
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
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return resp.data.data;
    }

    async deleteAllTodos(): Promise<void> {
        const resp = await axios.delete<AxiosResponse<void>>(`/tasks/all`);

        return resp.data.data;
    }

    async deleteTodo(todoId: string): Promise<string> {
        const resp = await axios.delete<AxiosResponse<string>>(`/tasks/${todoId}`);

        return resp.data.data;
    }

    async updateAllTodosStatuses(status: TodoStatus): Promise<TodoStatus> {
        const resp = await axios.put<AxiosResponse<TodoStatus>>(`/tasks/all`, { status });

        return resp.data.data;
    }

    async updateTodoStatus(todoId: string, status: TodoStatus): Promise<Todo> {
        const resp = await axios.put<AxiosResponse<Todo>>(`/tasks/${todoId}`, {
            status
        });

        return resp.data.data;
    }

    async updateTodoContent(todoId: string, content: string): Promise<Todo> {
        const resp = await axios.put<AxiosResponse<Todo>>(`/tasks/${todoId}`, {
            content
        });

        return resp.data.data;
    }
}


export default new ApiFullstack();
