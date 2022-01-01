import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const TODOS = 'todos'

class ApiFrontend extends IAPI {
    private getStorage(): Array<Todo> {
        const todos = localStorage.getItem(TODOS)
        return todos ? JSON.parse(todos) : []
    }

    private setStorage(todos: Todo[]): void {
        localStorage.setItem(TODOS, JSON.stringify(todos))
    }

    async createTodo(content: string): Promise<Todo> {
        const todo: Todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        }
        const todos = this.getStorage()
        this.setStorage(todos.concat(todo))
        return Promise.resolve(todo);
    }

    async getTodos(): Promise<Todo[]> {
        return Promise.resolve(this.getStorage())
    }

    async deleteTodo(id: string): Promise<void> {
        const todos = this.getStorage()
        const index = todos.findIndex(todo => todo.id === id)
        todos.splice(index, 1)
        this.setStorage(todos)
        return Promise.resolve()
    }

    async deleteAllTodos(): Promise<void> {
        this.setStorage([])
        return Promise.resolve()
    }

    async updateTodoContent(id: string, content: string): Promise<void> {
        const todos = this.getStorage()
        const index = todos.findIndex(todo => todo.id === id)
        todos[index].content = content
        this.setStorage(todos)
        return Promise.resolve()
    }

    async updateTodoStatus(id: string, checked: boolean): Promise<void> {
        const todos = this.getStorage()
        const index = todos.findIndex(todo => todo.id === id)
        todos[index].status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        this.setStorage(todos)
        return Promise.resolve()
    }

    async toggleAllTodos(checked: boolean): Promise<void> {
        const todos = this.getStorage()
        todos.forEach(todo => todo.status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE)
        this.setStorage(todos)
        return Promise.resolve()
    }
}

export default new ApiFrontend();