import { IAPI } from "./types";
import { Todo } from "../models/todo";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";

class ApiFullstack extends IAPI {
  deleteAllTodo(): Promise<boolean> {
      throw new Error("Method not implemented.");
  }
  async signIn(username: string, password: string): Promise<string> {
    const resp = await axios.get<AxiosResponse<string>>(
      `/login?user_id=${username}&password=${password}`
    );

    return resp.data.data;
  }

  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
      content,
    });

    return resp.data.data;
  }

  async getTodos(): Promise<Array<Todo>> {
    const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

    return resp.data.data;
  }
  async updateTodo(todoId: string, name: string, value: any): Promise<Todo> {
    return Promise.resolve({} as Todo);
  }
}

export default new ApiFullstack();
