import { IAPI } from "./types";
import { Todo, TodoStatus, EnhanceTodoStatus } from "../models/todo";
import shortid from "shortid";

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

    async getTodos(status?: EnhanceTodoStatus): Promise<Todo[]> {
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

    async updateTodoStatus(id: string, status: string): Promise<void> {}

    async updateManyTodoStatus(ids: string[], status: string): Promise<void> {}

    async deleteTodo(id: string) : Promise<void> {}

    async deleteAllTodos(): Promise<void> {}
}

export default new ApiFrontend();
