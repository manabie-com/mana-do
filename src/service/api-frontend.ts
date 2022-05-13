import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import { LocalStore } from '../store/local-store';

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
        if (!LocalStore.isInitialized) {
            const state = { todos: []};
            LocalStore.setCachedState(state);
            return state.todos;
        }
        return LocalStore.getCachedState().todos;
    }
}

export default new ApiFrontend();
