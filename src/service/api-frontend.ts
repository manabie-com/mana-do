import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { getItem } from "utils/localStorage"

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
        const todos: Array<Todo> = getItem("todos")
        const newTodo: Todo = todos.find((todo: Todo) => todo.id === id) as Todo
        Object.assign(newTodo, { content })
        return Promise.resolve(newTodo)
    }

    async updateTodoStatus(todoId: string, value: boolean): Promise<{ id: string, value: boolean }> {
        return Promise.resolve({ id: todoId, value })
    }

    async deleteTodo(todoId: string): Promise<string> {
        return Promise.resolve(todoId)
    }




}
export default new ApiFrontend();