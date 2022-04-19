import { IAPI } from "./types";
import { ITodo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<ITodo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    } as ITodo);
  }

  async getTodos(): Promise<ITodo[]> {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  }
}

export default new ApiFrontend();
