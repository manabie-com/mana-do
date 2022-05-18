import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.DO,
            id: shortid(),
            user_id: "firstUser",
        } as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        return [
            {
                content: "Content",
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: shortid(),
                user_id: "firstUser",
            } as Todo,
        ];
    }

    async getData(): Promise<any> {
        let dataLocalstorage = JSON.parse(localStorage.getItem('initialState') || "null")
        if (dataLocalstorage == null) {
            return null
        }
        return dataLocalstorage
    }

    async updateTodo(todo: Todo, content: string): Promise<Todo> {
        return Promise.resolve({ ...todo, content: content } as Todo);
    }

    async updateStatusTodo(todo: Todo, status: string): Promise<Todo> {
        return Promise.resolve({ ...todo, status: status } as Todo);
    }
}

export default new ApiFrontend();
