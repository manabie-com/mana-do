import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        const newTodo: Todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        }
        const getTodoList = JSON.parse(localStorage.getItem('todoList') || '[]')

        if (getTodoList.length) {
            const addTodo = [newTodo, ...getTodoList]
            localStorage.setItem('todoList', JSON.stringify(addTodo))
        } else {
            localStorage.setItem('todoList', JSON.stringify([newTodo]))
        }

        return Promise.resolve(newTodo);
    }

    async getTodos(): Promise<Todo[]>{
        const getTodoList = JSON.parse(localStorage.getItem('todoList') || '[]')
        return getTodoList
    }
}

export default new ApiFrontend();