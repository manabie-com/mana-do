import {IAPI} from './types';
import {Todo} from '../models/todo';
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

    async updateTodo(todo: Todo): Promise<Todo> {
       
        return todo
    }
    async toggleAllTodo(checked: boolean): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

        resp.data.data.forEach((task: Todo)=>{
            return {
              ...task,
              status: checked? "COMPELETED" : "ACTIVE"
            }
          })
          return resp.data.data
    }

    async deleteTodo(todoId: string): Promise<Array<Todo>> {
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);
        const index = resp.data.data.findIndex((task: Todo) => task.id === todoId);
        resp.data.data.splice(index, 1);

        return resp.data.data;
    }

    async deleteAllTodo(): Promise<[]> {
        return []
    }
}


export default new ApiFullstack();