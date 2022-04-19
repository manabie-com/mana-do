import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";

class ApiFullstack extends IAPI {
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

  async deleteAllTodos(): Promise<void> {}

  async toggleAllTodos(todos: Todo[], status: TodoStatus): Promise<Todo[]> {
    return [];
  }

  async updateTodo(todo: Todo): Promise<Todo[]> {
    return [];
  }

  async deleteTodo(todo: Todo): Promise<Todo[]> {
    return [];
  }
}

export default new ApiFullstack();
