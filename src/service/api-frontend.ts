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

    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        const getToDos = JSON.parse(localStorage.getItem('todos') || '[]');
        return await Promise.resolve(getToDos as Todo[]).then((res) => res);
    }

    async editTodo(todo: Todo): Promise<Todo> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(todo as Todo);
            }, 2000)
        });
    }
}

export default new ApiFrontend();