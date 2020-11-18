// TODO: Enforce coding style (indentation, semicolon,...) with eslint & prettier
import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

export const MOCK_TOKEN = 'testabc.xyz.ahk'
export const MOCK_USER = {
    username: 'firstUser',
    password: 'example',
}

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === MOCK_USER.username && password === MOCK_USER.password) {
            return Promise.resolve(MOCK_TOKEN)
        }

        return Promise.reject('Incorrect username/password')
	}
	
	async verifyToken(token: string): Promise<void> {
		if (token === MOCK_TOKEN) {
            return Promise.resolve()
        }
        return Promise.reject('Invalid token')
	}

    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: MOCK_USER.username
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        return []
    }
}

export default new ApiFrontend();
