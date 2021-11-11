import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { LOCAL_STORE } from '../shared/constant';
import userService from './user.service';
import { AxiosError } from 'axios';

const mockToken = 'testabc.xyz.ahk'

// Refactor APIFrontend File
// For me
// All actions from reducer should be implemented here because they should be handled from BE
// After the business code done, we will save the data to localStorage as a database by function `saveTodos`
// For each action, FE will call the getTodos API to make sure the list is always has latest data
class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string> {
        if (username === 'firstUser' && password === 'example') {
            localStorage.setItem(LOCAL_STORE.TOKEN, mockToken);
            return Promise.resolve(mockToken)
        }
        return Promise.reject({ message: 'Incorrect username/password' } as AxiosError)
    }

    async signOut(): Promise<string> {
        const token = userService.getToken();
        return token === mockToken ? Promise.resolve("Logout Successfully") : Promise.reject("An error has occurred");
    }

    async createTodo(content: string): Promise<Todo> {
        const todoItems = await this.getTodos();
        const newTodo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo
        // Fix the error in reducer, clone new object not use state mutation
        const result = [...todoItems, newTodo];
        await this.setTodos(result)
        if (newTodo) {
            return Promise.resolve(newTodo as Todo);
        }
        return Promise.reject('An error has occurred');
    }

    async getTodos(): Promise<Todo[]> {
        const items = localStorage.getItem(LOCAL_STORE.TODO_ITEMS) || '[]';
        const result = JSON.parse(items);
        return Promise.resolve(result);
    }

    async setTodos(items: Todo[]): Promise<void> {
        localStorage.setItem(LOCAL_STORE.TODO_ITEMS, JSON.stringify(items));
    }

    async deleteTodo(id: string): Promise<boolean> {
        const items = await this.getTodos();
        const deleteItemIndex = items.findIndex(todo => todo.id === id);
        if (deleteItemIndex !== -1) {
            // Fix the error in reducer, clone new object not use state mutation
            const result = items.filter(todo => todo.id !== id);
            await this.setTodos(result);
            return Promise.resolve(true);
        }
        return Promise.resolve(false)
    }

    async deleteAllTodo(): Promise<boolean> {
        await this.setTodos([]);
        return Promise.resolve(true);
    }

    async updateTodoStatus(id: string, checked: boolean): Promise<boolean> {
        const todos = await this.getTodos();
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex].status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
            await this.setTodos(todos);
            return Promise.resolve(true);
        }
        return Promise.resolve(false)
    }

    async toggleAllTodo(checked: boolean): Promise<boolean> {
        let todos = await this.getTodos();
        if (todos?.length) {
            todos = todos.map(todo => ({ ...todo, status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE }));
            await this.setTodos(todos);
            return Promise.resolve(true);
        }
        return Promise.resolve(false)
    }

    async updateTodo(id: string, content: string): Promise<boolean> {
        const todos = await this.getTodos();
        const findIndex = todos.findIndex(todo => todo.id === id);
        if (findIndex !== -1) {
            const result = todos.map(todo => ({ ...todo, content: id === todo.id ? content : todo.content }));
            await this.setTodos(result);
            return Promise.resolve(true);
        }
        return Promise.resolve(false)
    }
}

export default new ApiFrontend();