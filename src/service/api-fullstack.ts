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

    // to remove compile errors only
    updateTodoStatus(todoId: string, status: TodoStatus): Promise<void> {
        return Promise.resolve(undefined);
    }

    onDeleteAllTodo(): Promise<void> {
        return Promise.resolve(undefined);
    }

    onToggleAllTodo(checked: boolean): Promise<void> {
        return Promise.resolve(undefined);
    }

    onDeleteTodo(todoId: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    onUpdateTodoContent(todoId: string, content: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}


export default new ApiFullstack();
