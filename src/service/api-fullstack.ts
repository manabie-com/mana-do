import {IAPI} from './types';
import {Todo} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

class ApiFullstack extends IAPI {
    async createTodo(user_id: string, content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            user_id,
            content
        }).catch(err=>{
            throw new Error(err.response.data.data.message)
        });

        return resp.data.data;
    }

    async updateTodo(todoId: string, status: string): Promise<Todo> {
        const resp = await axios.patch<AxiosResponse<Todo>>(`/tasks/${todoId}`, {
            todoId, status
        });

        return resp.data.data;
    }

    async deleteTodo(todoId: string): Promise<String> {
        const resp = await axios.delete(`/tasks/${todoId}`);

        return resp.data.data;
    }

    async getTodos(): Promise<Array<Todo>>{
            const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`).catch(err=>{
                throw new Error(err)
            });
            return resp.data.data;
    }

    async toggleAllTodos(ids: Array<string>, status: string){
       for(let i = 0 ; i < ids.length; i++){
            await axios.patch<AxiosResponse<Todo>>(`/tasks/${ids[i]}`, {id:ids[i], status}).then(
            // result => todos.push(result.data.data)
           )
       }
    }

    async onDeleteAllTodos(ids: string[]){
        for(let i = 0 ; i < ids.length; i++){
            await axios.delete<AxiosResponse<Todo>>(`/tasks/${ids[i]}`).catch(err=>{
                throw new Error(err)
            });
       }
    }
}

export default new ApiFullstack();