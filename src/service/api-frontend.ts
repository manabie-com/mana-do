import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'
const cstList = "todo_list"

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken);
        }

        return Promise.reject('Incorrect username/password');
    }

    async createTodo(content: string): Promise<Todo> {
        let listTodo = JSON.parse(localStorage.getItem(cstList) || "[]");

        const newTodo: Todo = {
            content: content,
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        }
        
        listTodo.push(newTodo);

        localStorage.setItem(cstList, JSON.stringify(listTodo));

        return Promise.resolve(newTodo);
    }

    async updateTodo(data: Todo): Promise<Todo> {
        let listTodo = JSON.parse(localStorage.getItem(cstList) || "[]");

        const indexTodo = listTodo.findIndex( (todo: Todo) => todo.id === data.id);

        listTodo[indexTodo] = {
            ...data,
            updated_date: new Date().toISOString()
        }

        localStorage.setItem(cstList, JSON.stringify(listTodo));

        return Promise.resolve(listTodo[indexTodo]);
    }

    async updateAllStatusTodo(status: TodoStatus): Promise<string> {
        let listTodo = JSON.parse(localStorage.getItem(cstList) || "[]");

        listTodo = listTodo.map( (todo: Todo) => ({
            ...todo,
            status: status,
            updated_date: new Date().toISOString()
        }));

        localStorage.setItem(cstList, JSON.stringify(listTodo));

        return Promise.resolve("Success");
    }

    async deleteTodo(id: string): Promise<string> {
        let listTodo = JSON.parse(localStorage.getItem(cstList) || "[]");

        const indexTodo = listTodo.findIndex( (todo: Todo) => todo.id === id);

        listTodo.splice(indexTodo, 1);

        localStorage.setItem(cstList, JSON.stringify(listTodo));

        return Promise.resolve("Success");
    }

    async deleteAllTodo(): Promise<string> {
        localStorage.setItem(cstList, "[]");

        return Promise.resolve("Success");
    }

    async getTodos(): Promise<Todo[]>{
        const listTodo = JSON.parse(localStorage.getItem(cstList) || "[]")
        
        return Promise.resolve(listTodo);
    }
}

export default new ApiFrontend();