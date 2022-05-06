import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import { getToDosFromLocalStorage } from "../utils/localStorage";

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
        return getToDosFromLocalStorage();
    }
}

export default new ApiFrontend();
