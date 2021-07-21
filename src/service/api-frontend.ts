import shortid from 'shortid';

import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import {getTodosFromStorage} from "../utils/storeageUtils";

export const mockToken = 'testabc.xyz.ahk'

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
            status: TodoStatus.Active,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getTodosFromStorage());
            }, 1500);
        })
    }
}

export default new ApiFrontend();
