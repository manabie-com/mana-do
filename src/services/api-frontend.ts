import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';
import {
    getStoredTodos,
    storeTodo,
    editStoredTodo,
    deleteStoredTodo,
    deleteAllStoredTodo,
    toggleAllStoredTodo
} from "../utils/local-storage";

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo> {
        const todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo;

        storeTodo(todo);

        return Promise.resolve(todo);
    }

    async editTodo(todo: Todo): Promise<boolean> {
        editStoredTodo(todo);
        return Promise.resolve(true);
    }

    async deleteTodo(id: string): Promise<boolean> {
        deleteStoredTodo(id);
        return Promise.resolve(true);
    }

    async deleteAllTodos(): Promise<boolean> {
        deleteAllStoredTodo();
        return Promise.resolve(true);
    }

    async toggleAllTodos(checked: boolean): Promise<boolean> {
        toggleAllStoredTodo(checked);
        return Promise.resolve(true);
    }

    async getTodos(): Promise<Todo[]>{
        const todos = getStoredTodos();
        return Promise.resolve(todos);
    }
}

export default new ApiFrontend();
