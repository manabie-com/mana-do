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

    async deleteTodos(): Promise<void> {}

    async deleteTodo(todoId: string): Promise<Array<Todo>> { return []}

    async updateTodoStatus(todoId: string, checked: boolean): Promise<Array<Todo>> { return []}

    async updateTodoContent(todoId: string, content: string): Promise<Todo[]> { return [] }
}


export default new ApiFullstack();