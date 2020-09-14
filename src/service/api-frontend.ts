import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { getTodosFromLS, setTodosToLS } from '../utils/localStorage';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string> {
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }
        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo> {
        let todos = getTodosFromLS();
        const newTodo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
        }
        setTodosToLS([...todos, newTodo]);
        return Promise.resolve(newTodo);
    }

    async deleteTodo(todoId: string): Promise<string> {
        let todos = getTodosFromLS();
        setTodosToLS(todos.filter((todo: any) => todo.id !== todoId));
        return Promise.resolve("success");
    }

    async updateTodoStatus(todoId: string, checked: boolean): Promise<string> {
        let todos = getTodosFromLS();
        const tempTodos = [...todos];
        const index = tempTodos.findIndex((todo: any) => todo.id === todoId);
        tempTodos[index].status = checked
            ? TodoStatus.COMPLETED
            : TodoStatus.ACTIVE;
        setTodosToLS(tempTodos);
        return Promise.resolve('success');
    }

    async deleteAllTodo(): Promise<string> {
        setTodosToLS([]);
        return Promise.resolve("success");
    }

    async updateAllTodo(checked: boolean): Promise<string> {
        let todos = getTodosFromLS();
        const tempTodos = todos.map((todo: any) => {
            return {
                ...todo,
                status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
            };
        });
        setTodosToLS(tempTodos);
        return Promise.resolve("success");
    }

    async updateTodo(todoId: string, value: string): Promise<string> {
        let todos = getTodosFromLS();
        const tempTodos = [...todos];
        const index = tempTodos.findIndex((todo) => todo.id === todoId);
        tempTodos[index].content = value;
        setTodosToLS(tempTodos);
        return Promise.resolve("success");
    }

    async getTodos(params: any): Promise<Todo[]> {
        const { filter } = params;
        const todos = getTodosFromLS();
        if (filter === "ALL") return todos;
        return todos.filter((todo: any) => todo.status === filter);
    }
}

export default new ApiFrontend();