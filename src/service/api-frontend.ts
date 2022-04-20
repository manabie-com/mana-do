import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

const localStorageName = 'todo-manabie';

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        const todoItem = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            editContent: false,
            user_id: "firstUser",
        } as Todo;
        const temptLocalStorage = JSON.parse(localStorage.getItem(localStorageName) || "[]");
        localStorage.setItem(localStorageName, JSON.stringify([...temptLocalStorage, todoItem]));
        
        return Promise.resolve(todoItem);
    }

    async getTodos(): Promise<Todo[]> {
        return JSON.parse(localStorage.getItem(localStorageName) as any) || "[]";
    }

    async deleteTodos(): Promise<void> {
        return localStorage.setItem(localStorageName, '[]');
    }

    async deleteTodo(todoId: string): Promise<Todo[]> {
        const temptArr = await this.getTodos();
        const newArr = temptArr.filter(e => e.id !== todoId);
        JSON.stringify(localStorage.setItem(localStorageName, JSON.stringify(newArr)));

        return newArr;
    }

    async updateTodoStatus(todoId: string, checked: boolean): Promise<Todo[]> {
        const arrTodo = await this.getTodos();
        const index2 = arrTodo.findIndex((todo) => todo.id === todoId);
        arrTodo[index2].status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        localStorage.setItem(localStorageName, JSON.stringify(arrTodo));

        return arrTodo;
    }

    async updateTodoContent(todoId: string, todoContent: string): Promise<Todo[]> {
        const arrTodo = await this.getTodos();
        const idx = arrTodo.findIndex((todo) => todo.id === todoId);
        arrTodo[idx].content = todoContent;
        localStorage.setItem(localStorageName, JSON.stringify(arrTodo));

        return arrTodo;
    }
}

export default new ApiFrontend();
