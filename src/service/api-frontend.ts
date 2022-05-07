import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        var todos = await this.getTodos();

        var newTodo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
        }

        

        var index = todos.findIndex(item => item.id === newTodo.id);

        if (index === -1)
            todos.push(newTodo);
        else todos[index] = newTodo;

        localStorage.setItem('todos', JSON.stringify(todos));

        return Promise.resolve(newTodo as Todo);
    }

    async updateTodo(id: string, content: string, status: string) : Promise<Todo> {
        var todos = (JSON.parse(localStorage.getItem('todos') as string) || []) as Todo[];
        var item = todos.find(todo=>todo.id === id);

        if (item === undefined) 
            return this.createTodo(content);
        
        item = {
            ...item,
            content: content,
            status: status
        }

        var index = todos.findIndex(item => item.id === id);

        if (index === -1)
            todos.push(item);

        else todos[index] = item;

        localStorage.setItem('todos', JSON.stringify(todos));

        return Promise.resolve(item as Todo);
    }

    async deleteTodo(id: string) : Promise<Todo> {
        var todos = (JSON.parse(localStorage.getItem('todos') as string) || []) as Todo[];
        var index = todos.findIndex(todo =>todo.id === id);
        var item = undefined;

        console.log('delete', id, todos);

        if (index !== -1) {
            item = todos.splice(index, 1);
        }

        localStorage.setItem('todos', JSON.stringify(todos));

        console.log(localStorage.getItem('todos'));

        return Promise.resolve(item as Todo);
    }

    async getTodos(): Promise<Todo[]> {
        var todos = JSON.parse(localStorage.getItem('todos') as string) || [];
        return todos;
        // return [
        //     {
        //         content: "Content",
        //         created_date: new Date().toISOString(),
        //         status: TodoStatus.ACTIVE,
        //         id: shortid(),
        //         user_id: "firstUser",
        //     } as Todo,
        // ];
    }
}

export default new ApiFrontend();
