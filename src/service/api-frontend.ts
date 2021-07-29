import { IAPI, ApiReponse } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {

    getTodosMapping(): { [key: string]: Todo } {
        return JSON.parse(localStorage.getItem('todosMapping') || '{}')
    }

    toggleAllTodos(isCompleted: boolean): Promise<ApiReponse> {
        let todosMapping = this.getTodosMapping()
        Object.keys(todosMapping).forEach((key: string) => {
            todosMapping[key] = {
                ...todosMapping[key],
                status: isCompleted ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
            }
        })
        localStorage.setItem('todosMapping', JSON.stringify(todosMapping))
        return Promise.resolve({
            message: 'toggled all todo',
            status: 200
        })
    }

    deleteTodo(todoId: string): Promise<ApiReponse> {
        let todosMapping = this.getTodosMapping()
        delete todosMapping[todoId]
        localStorage.setItem('todosMapping', JSON.stringify(todosMapping))
        return Promise.resolve({
            message: `deleted todo ${todoId}`,
            status: 200
        })
    }

    deleteAllTodo(): Promise<ApiReponse> {
        localStorage.setItem('todosMapping', '{}')
        return Promise.resolve({
            message: 'deleted all todo',
            status: 200
        })
    }

    updateTodoContent(todoId: string, content: string): Promise<Todo> {
        let todosMapping = this.getTodosMapping()
        todosMapping[todoId] = {
            ...todosMapping[todoId],
            content
        }
        localStorage.setItem('todosMapping', JSON.stringify(todosMapping))
        return Promise.resolve(todosMapping[todoId])
    }

    updateTodoStatus(todoId: string, isCompleted: boolean): Promise<Todo> {
        let todosMapping = this.getTodosMapping()
        todosMapping[todoId] = {
            ...todosMapping[todoId],
            status: isCompleted ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
        localStorage.setItem('todosMapping', JSON.stringify(todosMapping))
        return Promise.resolve(todosMapping[todoId])
    }
    async signIn(username: string, password: string): Promise<string> {
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
        }
        const currentTodosMapping = this.getTodosMapping()
        currentTodosMapping[todo.id] = todo
        localStorage.setItem('todosMapping', JSON.stringify(currentTodosMapping))
        return Promise.resolve(todo as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        let todosMapping = this.getTodosMapping()
        return (Object.keys(todosMapping).map((key: string) => todosMapping[key]) || [])
    }
}

export default new ApiFrontend();