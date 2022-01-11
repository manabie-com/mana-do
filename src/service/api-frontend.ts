import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

class ApiFrontend extends IAPI {
    /*
    * Revised createTodo() to add the isBeingEdited property for tracking editing state
    */
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser',
            isBeingEdited: false,
        } as Todo);
    }

    /*
    * Revised getTodos() to incorporate stored todos state in the local storage
    */
    async getTodos(): Promise<Todo[]>{
        const storedTodos = localStorage.getItem('todos');
        return  storedTodos? JSON.parse(storedTodos) : [];
    }
}

export default new ApiFrontend();