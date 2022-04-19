import { IAPI } from "./types";
import { ITodo } from "../models/todo";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";

class ApiFullstack extends IAPI {
  async createTodo(content: string): Promise<ITodo> {
    const resp = await axios.post<AxiosResponse<ITodo>>(`/tasks`, {
      content,
    });

    return resp.data.data;
  }

  async getTodos(): Promise<Array<ITodo>> {
    const resp = await axios.get<AxiosResponse<Array<ITodo>>>(`/tasks`);

    return resp.data.data;
  }
}

export default new ApiFullstack();
