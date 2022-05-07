import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    private MANA_DO = 'MANA-DO'

    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
        } as Todo);
    }

    async saveTodos(todos: Todo[]): Promise<string> {
        const todosSave = JSON.stringify(todos);
        localStorage.setItem(this.MANA_DO, todosSave);
        return Promise.resolve('Save success');
    }

    async getTodos(): Promise<Todo[]> {
        const todoStorage = JSON.parse(localStorage.getItem(this.MANA_DO) || '[]');
        return Promise.resolve(todoStorage);
    }

    
}

export default new ApiFrontend();
