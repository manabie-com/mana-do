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
            user_id: 'firstUser'
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        const todosObj: string | null = window.localStorage.getItem('todos');
        if (todosObj === null) 
            return [];
        const todos: Array<Todo> = JSON.parse(todosObj);
        return todos;
    }

    async setTodos(todos: Array<Todo>):Promise<void>{
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }
}

export default new ApiFrontend();