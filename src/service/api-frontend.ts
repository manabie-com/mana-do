import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import { LOCAL_TODOS } from "../utils/contants";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
        } as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        const oldTodos = localStorage.getItem(LOCAL_TODOS) ? JSON.parse(localStorage.getItem(LOCAL_TODOS) as string) : []
        return oldTodos;
    }
}

export default new ApiFrontend();
