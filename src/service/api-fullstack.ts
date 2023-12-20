import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
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

    //  vo id
    async updateStatus(id: string, status: TodoStatus):  Promise<boolean> {
        return true
    }
    async clearAllTodo(): Promise<boolean> {
        return true;
    }
    async clearTodo(id: string) : Promise<boolean> {
        var todos = await this.getTodos()
        return true;
    }
    async updateTodo(id: string, content: string):  Promise<boolean> {
        return true
    }
}


export default new ApiFullstack();