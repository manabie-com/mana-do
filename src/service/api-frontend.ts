import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        // Don't need to use Promise.resolve here
        // async function turn returned value into Promise
        return {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
        } as Todo;
    }

    async getTodos(): Promise<Todo[]> {
        const lastTodos = localStorage.getItem("todos");
        if (lastTodos) {
            return JSON.parse(lastTodos) as Todo[];
        } else {
            return [];
        }
    }

    async persistTodos(todos: Todo[]): Promise<void> {
        localStorage.setItem("todos", JSON.stringify(todos));
        return;
    }
}

export default new ApiFrontend();
