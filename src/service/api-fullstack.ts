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

    async updateTodo(todo: Todo, id: string): Promise<Todo> {
        const resp = await axios.put<AxiosResponse<Todo>>(`/tasks/${id}`, {
            todo
        });

        return resp.data.data;
    }

    async deleteTodo(id: string): Promise<string> {
        const resp = await axios.delete<AxiosResponse<any>>(`/tasks/${id}`);

        return resp.status === 200 ? "Delete Success" : "Delete Error";
    }

    async saveTodos(todos: Todo[]): Promise<Todo[]> {
        localStorage.setItem('currentTodos', JSON.stringify(todos));
        return todos;
    }
}


export default new ApiFullstack();