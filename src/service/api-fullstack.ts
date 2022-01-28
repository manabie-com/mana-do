import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

class ApiFullstack extends IAPI {
    async login (username: string, password: string): Promise<any> {
        return await axios.post<AxiosResponse<any>>(`/login`, {
            username: username,
            password: password
        });
    }

    async register (username: string, password: string): Promise<any> {
        return await axios.post<AxiosResponse<any>>(`/register`, {
            username: username,
            password: password
        });
    }

    async createTodo(content: string) {
        return await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content,
            status: TodoStatus.ACTIVE
        });
    }

    async editTodo(content: string, status: string, todoId: string) {
        return await axios.put<AxiosResponse<Todo>>(`/tasks/${todoId}`, {
            content,
            status
        });
    }

    async deleteTodo(todoId: string) {
        return await axios.delete<AxiosResponse<Todo>>(`/tasks/${todoId}`);
    }

    async deleteAllTodo(todoIds: Array<string>) {
        todoIds.forEach(todoId => {
            axios.delete<AxiosResponse<Todo>>(`/tasks/${todoId}`);
        })
    }

    async toggleAllTodos(todos: Array<Todo>, status: string) {
        todos.forEach(todo => {
            axios.put<AxiosResponse<Todo>>(`/tasks/${todo.id}`, {
                content: todo.content,
                status: status
            });
        })
    }

    async getTodos(){
        return await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);
    }
}


export default new ApiFullstack();