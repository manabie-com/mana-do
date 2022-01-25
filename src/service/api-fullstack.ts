import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';
import shortid from 'shortid';

class ApiFullstack extends IAPI {
    async createTodo(content: string) {
        // async createTodo(content: string): Promise<Todo> {
        // const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
        //     content
        // });
        const newTodo: Todo = {
            id: shortid(),
            content,
            status: TodoStatus.ACTIVE,
            created_date: new Date().toISOString(),
            user_id: "firstUser"
        }
        return newTodo;
    }

    async getTodos(){
        // async getTodos(): Promise<Array<Todo>> {
        // const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        return 2;
    }
}


export default new ApiFullstack();