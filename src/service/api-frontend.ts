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
        const newId = shortid();
        const item: Todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: newId,
            user_id: 'firstUser'
        }
        localStorage.setItem(`__todo__${newId}`, JSON.stringify(item));
        return Promise.resolve(item);
    }

    async getTodos(): Promise<Todo[]>{
        const keys = Object.keys(localStorage);
        const values: Todo[] = [];
        keys.forEach((key) => {
            if (key.indexOf('__todo__') === 0) {
                const itemStr = localStorage.getItem(key);
                if (itemStr?.length) {
                    values.push(JSON.parse(itemStr));
                }
            }
        });
        return values;
    }

    async deleteTodo(todoId: string): Promise<string | null> {
        const key = `__todo__${todoId}`;
        const itemStr = localStorage.getItem(key);
        if (itemStr) {
            localStorage.removeItem(key);
            return todoId;
        }
        return null;
    }
}

export default new ApiFrontend();