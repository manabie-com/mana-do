import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { join } from 'path';

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

    async getTodos(): Promise<Todo[]> {
        const todos: Array<Todo> = JSON.parse(localStorage.getItem("todos") as string)
        return Promise.resolve(todos as Array<Todo>)
    }

    async editTodo(content: string, id: string): Promise<Todo> {
        const todos: Array<Todo> = JSON.parse(localStorage.getItem("todos") as string)
        const newTodo: Todo = todos.find((todo: Todo) => todo.id === id) as Todo
        Object.assign(newTodo, { content })
        return Promise.resolve(newTodo)
    }

}
export default new ApiFrontend();