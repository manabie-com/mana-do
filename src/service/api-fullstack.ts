import {IAPI} from './types';
import {ITodoItem, Todo} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

class ApiFullstack extends IAPI {

    async createTodoItem(todoItem: ITodoItem): Promise<ITodoItem> {
        const resp = await axios.post<AxiosResponse<ITodoItem>>(`/tasks`, {
            todoItem
        });

        return resp.data.data;
    }

    async ModifyTodoItem(todoItem: ITodoItem): Promise<ITodoItem> {
        
        const resp = await axios.post<AxiosResponse<ITodoItem>>(`/tasks`, {
            todoItem
        });
        return resp.data.data;
    }

    async getTodoList(): Promise<Array<ITodoItem>> {
        const resp = await axios.get<AxiosResponse<Array<ITodoItem>>>(`/tasks`);

        return resp.data.data;
    }
}


export default new ApiFullstack();