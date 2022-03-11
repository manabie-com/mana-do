import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid.generate(),
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

    async updateTodoStatus(todoId: any, checked: boolean): Promise<Todo> {
        return [
            {
                content: "Content",
                created_date: new Date().toISOString(),
                status: checked === true ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
                id: todoId,
                user_id: "firstUser",
            } as Todo,
        ];
    }

    async toggleAllTodos(checked: boolean): Promise<Todo[]> {
        return [
            {
                content: "Content",
                created_date: new Date().toISOString(),
                status: checked === true ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
                id: shortid(),
                user_id: "firstUser",
            } as Todo,
        ];
    }

    async deleteTodo(todoId: string): Promise<Todo> {
        return [
            {
                content: "Content",
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: todoId,
                user_id: "firstUser",
            } as Todo,
        ];
    }
    
}

export default new ApiFrontend();
