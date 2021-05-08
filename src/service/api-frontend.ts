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
        const newToDo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo;

        this.getTodos().then((todos: Todo[]) => {
            localStorage.setItem('todos', JSON.stringify([...todos, newToDo]))
        });

        return Promise.resolve(newToDo);
    }

    async getTodos(): Promise<Todo[]>{
        const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
        return Promise.resolve(todos);
    }
}

export default new ApiFrontend();
