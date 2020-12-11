import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string> {
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo> {
        const tasks = JSON.parse(localStorage.getItem("todos") || "[]");
        const newTask = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        };
        tasks.push(newTask);
        localStorage.setItem('todos', JSON.stringify(tasks));

        return Promise.resolve(newTask as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        const tasks = JSON.parse(localStorage.getItem("todos") || "[]"); // get all tasks or return []
        return Promise.resolve(tasks)
    }

    async updateTodo(todo: Todo): Promise<Todo> {
        const tasks = JSON.parse(localStorage.getItem("todos") || "[]");
        
        const index = tasks.findIndex((task: Todo) => task.id === todo.id);

        tasks[index]= todo;
        localStorage.setItem('todos', JSON.stringify(tasks));
       
        return Promise.resolve(tasks[index])
    }

    async toggleAllTodo(checked: boolean): Promise<Todo[]> {
        const tasks = JSON.parse(localStorage.getItem("todos") || "[]");
        const temptTodo = tasks.map((task: Todo) => {
            return {
                ...task,
                status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
            }
        })
        localStorage.setItem('todos', JSON.stringify(temptTodo));
        return Promise.resolve(temptTodo)
    }

    async deleteTodo(todoId: string): Promise<Todo[]> {
        const tasks = JSON.parse(localStorage.getItem("todos") || "[]");
        const index = tasks.findIndex((task: Todo) => task.id === todoId);
        tasks.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(tasks));
        return Promise.resolve(tasks);
    }

    async deleteAllTodo(): Promise<[]> {
        localStorage.setItem('todos', JSON.stringify([]));
        return Promise.resolve([])
    }
}

export default new ApiFrontend();