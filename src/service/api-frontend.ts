import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import axios from '../utils/axios';
import shortid from "shortid";

const baseurl = 'http://localhost:3000'
class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        var data = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
        } as Todo;

        const resp = await axios.post<Todo>(`${baseurl}/todos`, data);

        return resp.data;
    }

    async getTodos(): Promise<Todo[]> {
        const resp = await axios.get<Array<Todo>>(`${baseurl}/todos`);
        return resp.data;
    }

    async updateTodo(data: Todo): Promise<Todo> {
        const resp = await axios.put<Todo>(`${baseurl}/todos/${data.id}`, data);
        return resp.data;
    }

    async deleteTodo(id: string): Promise<Todo> {
        const resp = await axios.delete<Todo>(`${baseurl}/todos/${id}`);
        return resp.data;
    }
}

export default new ApiFrontend();
