import {IAPI} from "./types";
import {Todo, TodoStatus} from "../models/todo";
import shortid from "shortid";
import {removeTodoService, updateTodoService, TResponse, updateStatusTodoService} from "./utils";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        const dataCreateTodoList =  {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
            is_important: false,
        };

        const dataListTodo:any = await localStorage.getItem('todolist') || '[]';

        const dataToAPI = await JSON.parse(dataListTodo)

        await dataToAPI.push(dataCreateTodoList)

        await localStorage.setItem('todolist', JSON.stringify(dataToAPI))

        return dataCreateTodoList
    }

    async getTodos(): Promise<Todo[]> {
        const dataListTodo = await localStorage.getItem('todolist') as string

        await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec

        const dataToFE = await JSON.parse(dataListTodo) as Todo[]

        return dataToFE;
    }

    async updateTodo(todId: string, content: string): Promise<TResponse> {
        return updateTodoService(todId, content);
    }


    async removeTodo(todId: string): Promise<TResponse> {
        return removeTodoService(todId);
    }

   async updateStatusTodo(todId: string, status: TodoStatus): Promise<TResponse> {
        return updateStatusTodoService(todId, status);
    }

}

export default new ApiFrontend()
