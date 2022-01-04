import {IAPI} from './types';
import {Todo} from '../models/todo';
import axios from '../utils/axios';
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
    async updateTodoStatus(todoId: string, value: boolean) : Promise<any> {
        return Promise.resolve({todoId,value})
    }
    async toggleAllTodo(value: boolean) : Promise<any> {
        return Promise.resolve(true)
    }
    async deleteAllTodo(): Promise<any> {
        return Promise.resolve(true)
    }
    async deleteTodo(todoId: string): Promise<any> {
        return Promise.resolve(todoId)
    }
    async updateTodoContent(todoId: string, value: string): Promise<any> {
        return Promise.resolve({todoId,value})
    }
}


export default new ApiFullstack();