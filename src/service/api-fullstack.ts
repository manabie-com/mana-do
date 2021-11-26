import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';
import shortid from 'shortid';

class ApiFullstack extends IAPI {
    async signIn(username: string, password: string): Promise<string> {
        const resp = await axios.post<AxiosResponse<string>>(`/login`, {
            username,
            password
        });
        return resp.data.data
    }

    ///////////////////
    // async createTodo(content: string): Promise<Todo> {
    //     const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
    //         content
    //     });
    //     return resp.data.data;
    // }
    ///////////////////
    
    /////////////////// REUSE CREATE TODO FUNCTION FROM API-FRONTEND
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }
    ///////////////////

    async getTodos(): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return resp.data.data;
    }
}


export default new ApiFullstack();