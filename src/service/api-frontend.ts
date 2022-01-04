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
        const todos = localStorage.getItem('todos')
        if(todos)
            return Promise.resolve(JSON.parse(todos))
        else
            return  Promise.resolve([])
    }
    async updateTodoStatus(todoId: string, value: boolean) : Promise<any> {
        return Promise.resolve({todoId,value})
    }
    async toggleAllTodo(value: boolean) : Promise<any> {
        return Promise.resolve(true)
    }
    async deleteAllTodo(): Promise<any> {
        return Promise.resolve(true)
    }
    async deleteTodo(todoId: string): Promise<any> {
        return Promise.resolve(todoId)
    }
    async updateTodoContent(todoId: string, value: string): Promise<any> {
        return Promise.resolve({todoId,value})
    }
}   

export default new ApiFrontend();