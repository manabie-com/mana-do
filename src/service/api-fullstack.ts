import { IAPI } from "./types";
import { Todo } from "../models/todo";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { User } from "../models/user";

class ApiFullstack extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    const resp = await axios.get<AxiosResponse<string>>(
      `/login?user_id=${username}&password=${password}`
    );

    return resp.data.data;
  }

  async getUser(token: string): Promise<User> {
    return Promise.resolve({
      user_id: "firstUser",
      username: "firstUser",
    } as User);
  }

  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
      content,
    });

    return resp.data.data;
  }

  async getTodos(user_id: string): Promise<Array<Todo>> {
    const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

    return resp.data.data;
  }

  async getTodo(todoId: string): Promise<Todo> {
    const resp = await axios.get<AxiosResponse<Todo>>(`/tasks`);

    return resp.data.data;
  }

  async removeTodo(): Promise<Todo> {
    return Promise.reject("");
  }

  async updateAllTodoStatus(): Promise<boolean> {
    return Promise.reject("");
  }

  async updateTodoStatus(): Promise<boolean> {
    return Promise.reject("");
  }

  async updateTodoContent(todoId: string, content: string): Promise<Todo> {
    return Promise.reject("");
  }
}

export default new ApiFullstack();
