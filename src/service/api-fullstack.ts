import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

class ApiFullstack extends IAPI {
    async signIn(username: string, password: string): Promise<Object> {
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

    async updateTodo(field: any,value : any, id: string): Promise<Todo> {

        let listTodos:any = localStorage.getItem('listTodos') || '[]' // fake data api - save to local storage
        listTodos = JSON.parse(listTodos)// add for turn of error checking
        const index = listTodos.findIndex((todo:any) => todo.id === id);
        listTodos[index][field] = value;
        localStorage.setItem('listTodos',JSON.stringify(listTodos));

        return Promise.resolve(listTodos[index] as Todo);
    }
    async deleteTodo(id: string): Promise<Todo[]> {
        let listTodos:any = localStorage.getItem('listTodos') || '[]' //fake api delete todo in localstorage
        listTodos = JSON.parse(listTodos)// add for turn of error checking
        const index = listTodos.findIndex((todo:any) => todo.id === id);
        if (index > -1) {
            listTodos.splice(index, 1);
        }
        localStorage.setItem('listTodos',JSON.stringify(listTodos));
        return Promise.resolve(listTodos)
    }
    async deleteAllTodo(): Promise<String>{
        let listTodos : any= []
        localStorage.setItem('listTodos',JSON.stringify(listTodos));
        return Promise.resolve('200')
    }
    async updateAllTodo(status: boolean): Promise<String>{
        let listTodos:any = localStorage.getItem('listTodos') || '[]'
        listTodos = JSON.parse(listTodos)
        listTodos && listTodos.length && listTodos.map((v: Todo) => {
            v.status = status ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        })
        localStorage.setItem('listTodos',JSON.stringify(listTodos));
        return Promise.resolve('201')
    }
}


export default new ApiFullstack();