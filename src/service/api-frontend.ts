import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';
import LocalStorageService from './local-storage'

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    createTodo(content: string): Promise<Todo> {
        const newTodo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo

        return Promise.resolve(LocalStorageService.createTodoList(newTodo))
    }

    getTodos(): Promise<Todo[]>{
        return Promise.resolve(LocalStorageService.getTodoList())
    }

    deleteTodoItem(todoId: string): Promise<void> {
        return LocalStorageService.deleteTodoItem(todoId)
    }

    clearTodo(): Promise<void> {
        return LocalStorageService.clearTodoList()
    }

    updateTodoItemContent(todo: Todo): Promise<void> {
        return LocalStorageService.updateTodoName(todo)
    }

    updateTodoStatus(todoList: Todo[]): Promise<Todo[]> {
        return LocalStorageService.updateTodoStatus(todoList)
    }
}

export default new ApiFrontend();
