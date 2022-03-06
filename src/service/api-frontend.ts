import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

const convertLocalStorageToData = (key: string) => {
    const strData = localStorage.getItem(key);
    return JSON.parse(strData as string);
}

const setDataForLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
}
class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        const todos = convertLocalStorageToData('todos');

        const response = Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
        } as Todo);

        response.then(res => {
            todos.push(res);
            setDataForLocalStorage('todos', todos);
        })

        return response;
    }

    async deleteTodo(id: string): Promise<void> {
        const todos = convertLocalStorageToData('todos');

        const index = todos.findIndex((todo: any) => todo.id === id);
        todos.splice(index, 1);
        setDataForLocalStorage('todos', todos);
    }

    async updateTodo(id: string, checked: boolean): Promise<void> {
        const todos = convertLocalStorageToData('todos');

        const response = Promise.resolve({ id, checked });
        response.then(res => {
            const index = todos.findIndex((todo: any) => todo.id === res.id);
            todos[index].status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
            setDataForLocalStorage('todos', todos);
        });
    }

    async toggleAllTodo(checked: boolean): Promise<void> {
        const todos = convertLocalStorageToData('todos');

        const resultTodos = todos.map((todo: Todo) => ({
            ...todo,
            status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }));
        setDataForLocalStorage('todos', resultTodos);
    }

    async deleteAllTodo(): Promise<void> {
        setDataForLocalStorage('todos', []);
    }

    async editTodo(id: string, content: string): Promise<void> {
        const todos = convertLocalStorageToData('todos');
        const index = todos.findIndex((todo: any) => todo.id === id);
        todos[index].content = content;
        setDataForLocalStorage('todos', todos);
    }

    async getTodos(): Promise<Todo[]> {
        let response = null;
        const todos = convertLocalStorageToData('todos');
        if (todos) {
            response = Promise.resolve([...todos]);
        } else {
            setDataForLocalStorage('todos', []);
            response = Promise.resolve([]);
        }
        return response;
    }
}

export default new ApiFrontend();
