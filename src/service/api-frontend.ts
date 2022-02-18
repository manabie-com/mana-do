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
            user_id: "tql247",
            selected: false
        } as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        // get from localStorage
        return [
            {
                content: "Content",
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: shortid(),
                user_id: "tql247",
            } as Todo,
        ];
    }
}

export default new ApiFrontend();
