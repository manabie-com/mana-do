import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
            checked: false,
        } as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        const getLocalStorageTodos = localStorage.getItem('currentTodos');
        const currentTodos = getLocalStorageTodos ? JSON.parse(getLocalStorageTodos) : [];
        return currentTodos;
    }

    async saveTodos(todos: Todo[]): Promise<Todo[]> {
        localStorage.setItem('currentTodos', JSON.stringify(todos));
        return todos;
    }

    async updateTodo(todoUpdate: Todo, id: string): Promise<Todo> {
        return Promise.resolve(todoUpdate as Todo);
    }
    async deleteTodo(id: string): Promise<string> {
        return Promise.resolve("Delete Success");
    }
}

export default new ApiFrontend();
