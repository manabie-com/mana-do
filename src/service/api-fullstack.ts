import { IAPI } from "./types";
import { Todo } from "../models/todo";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";

class ApiFullstack extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
      content,
    });

    return resp.data.data;
  }

  getTodos(): Todo[] {
    return [];
  }

  persistentTodos(todos: Todo[]) {}
}

export default new ApiFullstack();
