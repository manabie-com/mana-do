import {IAPI} from "./types";
import {Todo, TodoStatus} from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        const todo: Todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
        };
        this.saveToLocalStorage(todo);

        return Promise.resolve(todo);
    }

    async getTodos(): Promise<Todo[]> {
        return this.getTodosFromLocalStorage();
    }

    private saveToLocalStorage(todo: Todo) {
        const todos = this.getTodosFromLocalStorage();
        todos.unshift(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    private getTodosFromLocalStorage(): Todo[] {
        const todosStr = localStorage.getItem('todos');
        return todosStr ? JSON.parse(todosStr) as Todo[] : [];
    }
}

export default new ApiFrontend();
