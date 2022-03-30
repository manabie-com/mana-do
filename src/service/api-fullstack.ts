import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import shortid from "shortid";

class ApiFullstack extends IAPI {
  createTodo(content: string) {
    return {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    } as Todo;
  }
  async getTodos(): Promise<Array<Todo>> {
    const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

    return resp.data.data;
  }
}

export default new ApiFullstack();
