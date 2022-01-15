import produce from 'immer';
import shortid from 'shortid';

import {IAPI, ParamsUpdateTodo} from './types';
import {Todo, TodoStatus} from '../models/todo';
import StorageService from './StorageService'
import {STORAGE_TODO_LIST, successResponse} from '../utils/constant'

class ApiFrontend extends IAPI {
    todoStorage: StorageService<Todo[]>

    constructor() {
        super()
        this.todoStorage = new StorageService<Todo[]>(STORAGE_TODO_LIST, [])
    }

    async createTodo(content: string): Promise<Todo> {
        const newTodo: Todo = {
            content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        }
        const todos = await this.getTodos()
        this.todoStorage.set([...todos, newTodo])
        return Promise.resolve(newTodo);
    }

    async updateTodo(id: string, todo: ParamsUpdateTodo) {
        const todos = await this.getTodos()
        const newTodos = produce(todos, (draft) => {
            const index = todos.findIndex(item => item.id === id)
            if (index !== -1) {
                draft[index] = { ...draft[index], ...todo}
            }
        })
        this.todoStorage.set(newTodos)
        return Promise.resolve(successResponse)
    }

    async getTodos(): Promise<Todo[]>{
        const todos = this.todoStorage.get()
        return Promise.resolve(todos)
    }
}

export default new ApiFrontend();