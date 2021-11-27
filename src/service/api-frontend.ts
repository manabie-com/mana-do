import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk';

class ApiFrontend extends IAPI {
    TODOS = 'todos';

    async signIn(username: string, password: string): Promise<string> {
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken);
        }

        return Promise.reject('Incorrect username/password');
    }

    async createTodo(content: string): Promise<Todo> {
        const todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser',
        };

        const localTodos = localStorage.getItem(this.TODOS);
        if (localTodos) {
            const todos = JSON.parse(localTodos);
            todos.push(todo);
            localStorage.setItem(this.TODOS, JSON.stringify(todos));
        } else {
            localStorage.setItem(this.TODOS, JSON.stringify([todo]));
        }

        return Promise.resolve(todo);
    }

    async getTodos(): Promise<Todo[]> {
        const localTodos = localStorage.getItem(this.TODOS);
        if (localTodos) return JSON.parse(localTodos);
        return [];
    }

    async deleteTodo(todoId: String) {
        const localTodos = localStorage.getItem(this.TODOS);
        if (localTodos) {
            const todos = JSON.parse(localTodos);
            const index = todos.findIndex((todo: Todo) => todo.id === todoId);
            todos.splice(index, 1);
            localStorage.setItem(this.TODOS, JSON.stringify(todos));
        }
    }

    async deleteAll() {
        localStorage.setItem(this.TODOS, '[]');
    }

    async updateTodos(todos: Todo[]) {
        localStorage.setItem(this.TODOS, JSON.stringify(todos));
    }
}

export default new ApiFrontend();
