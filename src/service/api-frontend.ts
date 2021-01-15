import shortid from 'shortid';
import { Todo, TodoStatus } from '../models/todo';
import localStorageUtils from '../utils/localStorage.utils';
import { IAPI } from './types';

const mockToken = 'testabc.xyz.ahk';
const LOCAL_STORAGE_TODO_KEY = 'TODOS';

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string> {
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async initializeTodos() {
        const initTodos: Todo[] = [];
        localStorageUtils.setItem(LOCAL_STORAGE_TODO_KEY, initTodos);
    }

    async getTodos(): Promise<Todo[]> {
        const todos = localStorageUtils.getItem(LOCAL_STORAGE_TODO_KEY);
        if (!todos) {
            this.initializeTodos();
            return Promise.resolve([])
        } else {
            return Promise.resolve(todos);
        }
    }

    async createTodo(content: string): Promise<Todo> {
        const newTodo: Todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        }
        const todos = localStorageUtils.getItem(LOCAL_STORAGE_TODO_KEY) as Todo[];
        todos.push(newTodo);
        localStorageUtils.setItem(LOCAL_STORAGE_TODO_KEY, todos);
        return Promise.resolve(newTodo);
    }

    // Consider merge update todo status with update todo?
    async updateTodoStatus(todoId: string, completed: boolean) {
        const todos = localStorageUtils.getItem(LOCAL_STORAGE_TODO_KEY) as Todo[];
        const newTodos = todos.map(todo => {
            if (todoId === todo.id) return {
                ...todo,
                status: completed ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
            }
            else return todo;
        });
        localStorageUtils.setItem(LOCAL_STORAGE_TODO_KEY, newTodos);
        return Promise.resolve(newTodos);
    }

    async updateTodo(todoId: string, content: string) {
        const todos = localStorageUtils.getItem(LOCAL_STORAGE_TODO_KEY) as Todo[];
        const newTodos = todos.map(todo => {
            if (todoId === todo.id) return todo;
            else return {
                ...todo,
                content,
            }
        });
        localStorageUtils.setItem(LOCAL_STORAGE_TODO_KEY, newTodos);
        return Promise.resolve(newTodos);
    }

    async toggleAllTodos(completed: boolean) {
        const todos = localStorageUtils.getItem(LOCAL_STORAGE_TODO_KEY) as Todo[];
        const newTodos = todos.map(todo => {
            return {
                ...todo,
                status: completed ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
            }
        });
        localStorageUtils.setItem(LOCAL_STORAGE_TODO_KEY, newTodos);
        return Promise.resolve(newTodos);
    }

    async deleteTodo(todoId: string): Promise<Todo[]> {
        const todos = localStorageUtils.getItem(LOCAL_STORAGE_TODO_KEY) as Todo[];
        const newTodos = todos.filter((todo) => todo.id !== todoId);
        localStorageUtils.setItem(LOCAL_STORAGE_TODO_KEY, newTodos);
        return Promise.resolve(newTodos);
    }

    async deleteAllTodos(): Promise<Todo[]> {
        const todos = localStorageUtils.getItem(LOCAL_STORAGE_TODO_KEY) as Todo[];
        this.initializeTodos();
        return Promise.resolve(todos);
    }
}

export default new ApiFrontend();