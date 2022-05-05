import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import KeyStorages from "../constants/key-storages";

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

        const arrTodoLocal: Todo[] = JSON.parse(localStorage.getItem(KeyStorages.LIST_TODO)!) || [];
        return Promise.resolve(arrTodoLocal as Todo[]);
    }
}

export default new ApiFrontend();
