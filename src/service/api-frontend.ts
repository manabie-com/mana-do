import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async toggleAllTodo(checked: boolean): Promise<boolean> {
        return true;
    }

    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async editTodoStatus(id: string, status: string): Promise<boolean> {
        return true;
    }
    async editTodo(id: string, content: string): Promise<boolean> {
        return true;
    }
    async deleteTodo(id: string): Promise<boolean> {
        return true;
    }
    async deleteAll(): Promise<boolean> {
        return true;
    }
    

    async getTodos(): Promise<Todo[]>{
        return  JSON.parse(localStorage.getItem('todos') || '[]');
    }
}

export default new ApiFrontend();