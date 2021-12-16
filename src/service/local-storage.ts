import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

class LocalStorage extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        return Promise.resolve(JSON.parse(localStorage.getItem('todos') || ''))
    }

    async storeTodos(todos: Todo[]) {
        localStorage.setItem('todos', JSON.stringify(todos))
    }   
}

export default new LocalStorage();