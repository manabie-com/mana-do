import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';
import { getStorage, setStorage } from '../utils';
import { TODO_STORAGE } from '../utils/constants';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo> {
        const newItem = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        }

        const data: Todo[] = getStorage(TODO_STORAGE)
        data.push(newItem)
        setStorage(TODO_STORAGE, data)

        return Promise.resolve(newItem as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        const data: Todo[] = getStorage(TODO_STORAGE)
        return await data || []
    }

    async updateTodo(todo: Todo): Promise<Todo> {
        const data: Todo[] = getStorage(TODO_STORAGE)
        const foundIndex = data.findIndex(x => x.id === todo.id)
        data[foundIndex] = todo
        setStorage(TODO_STORAGE, data)

        return Promise.resolve(todo as Todo);
    }

    async deleteTodo(todoId: string): Promise<any> {
        const data: Todo[] = getStorage(TODO_STORAGE)
        const updateData = data.filter(x => x.id !== todoId)
        setStorage(TODO_STORAGE, updateData)

        return Promise.resolve({
            success: true
        });
    }

    async toggleAll(isActive: boolean): Promise<any> {
        const data: Todo[] = getStorage(TODO_STORAGE)
        const updateData = data.map(x => {
            return {
                ...x,
                status: isActive ? TodoStatus.ACTIVE : TodoStatus.COMPLETED
            }
        })
        setStorage(TODO_STORAGE, updateData)

        return Promise.resolve({
            success: true
        });
    }

    async deleteAll(userId: string): Promise<any> {
        setStorage(TODO_STORAGE, [])

        return Promise.resolve({
            success: true
        });
    }
}

export default new ApiFrontend();