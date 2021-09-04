import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';
import { getStorage } from '../utils';
import { TODO_STORAGE } from '../utils/constants';

const mockToken = 'testabc.xyz.ahk'

function wait(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

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
        // Fake delay from call api
        await wait(500);

        const data: Todo[] = getStorage(TODO_STORAGE)
        return await data || []
    }
}

export default new ApiFrontend();