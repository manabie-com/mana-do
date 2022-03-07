import {IAPI} from "./types";
import {Todo, TodoStatus} from "../models/todo";
import shortid from "shortid";
import {localStoreData} from "../utils";

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
        return localStoreData()
    }

    async updateTodos(todos: Array<Todo>): Promise<any> {
        return localStoreData(todos)
    }
}

export default new ApiFrontend();
