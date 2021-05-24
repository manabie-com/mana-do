import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

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

    removeTodo(id: string): Promise<string> {
        throw "this method is not implemented";
    }

    updateTodo(id: string, content?: string | undefined, status?: TodoStatus | undefined): Promise<Todo> {
        throw "this method is not implemented";
    }

    updateTodos(todos: Todo[]): Promise<Todo[]> {
        throw "this method is not implemented";
    }
}


export default new ApiFullstack();