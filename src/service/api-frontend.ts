import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser',
            isEditing: false
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        return JSON.parse(window.localStorage.getItem('state') as string)?.todos || []
    }
}

export default new ApiFrontend();