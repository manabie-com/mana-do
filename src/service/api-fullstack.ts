import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';
import {removeTodoService, updateTodoService, TResponse, updateStatusTodoService} from "./utils";

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

    async updateTodo(todId: string, content: string): Promise<TResponse> {
        return updateTodoService(todId, content);
    }

    async removeTodo(todId: string): Promise<TResponse> {
        return removeTodoService(todId);
    }

    async updateStatusTodo(todId: string, status: TodoStatus): Promise<TResponse> {
        return updateStatusTodoService(todId, status);
    }
}


export default new ApiFullstack();