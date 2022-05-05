import {IAPI} from "./types";
import {Todo, TodoStatus} from "../models/todo";
import shortid from "shortid";
import {TODOS_LOCAL_STORAGE_KEY} from "../constants";

class ApiFrontend extends IAPI {
    // FIXED: Since this function returns a Promise, async is not a necessary keyword here
    createTodo(content: string): Promise<Todo> {
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

    getTodos(): Promise<Todo[]> {
        return Promise.resolve(this.getTodosFromLocalStorage());
    }

    // ADDED: update status in localStorage
    updateTodoStatus(todoId: string, status: TodoStatus): Promise<void> {
        const todos = this.getTodosFromLocalStorage();
        const index = todos.findIndex(item => item.id === todoId);
        if (index !== -1) {
            todos[index].status = status;
            this.saveTodos(todos);
            return Promise.resolve();
        }
        return Promise.reject();
    }

    onToggleAllTodo(checked: boolean): Promise<void> {
        const todos = this.getTodosFromLocalStorage();
        todos.forEach(item => item.status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE);
        this.saveTodos(todos);
        return Promise.resolve();
    }

    onDeleteAllTodo(): Promise<void> {
        localStorage.removeItem(TODOS_LOCAL_STORAGE_KEY);
        return Promise.resolve();
    }

    onDeleteTodo(todoId: string) {
        const todos = this.getTodosFromLocalStorage();
        this.saveTodos(todos.filter(item => item.id !== todoId));
        return Promise.resolve();
    }

    private saveToLocalStorage(todo: Todo) {
        const todos = this.getTodosFromLocalStorage();
        todos.unshift(todo);
        this.saveTodos(todos);
    }

    private getTodosFromLocalStorage(): Todo[] {
        const todosStr = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
        return todosStr ? JSON.parse(todosStr) as Todo[] : [];
    }

    private saveTodos(todos: Todo[]) {
        localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
}

export default new ApiFrontend();
