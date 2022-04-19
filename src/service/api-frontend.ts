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
            editContent: false,
            user_id: "firstUser",
        } as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        return JSON.parse(localStorage.getItem('todo-manabie') as any) || [
            {
                        content: "Content",
                        created_date: new Date().toISOString(),
                        status: TodoStatus.ACTIVE,
                        id: shortid(),
                        editContent: false,
                        user_id: "firstUser",
            } as Todo,
        ];
    }
}

export default new ApiFrontend();
