import { IAPI } from "./types";
import { Todo, TodoStatus } from "../store/models";
import shortid from "shortid";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    const todos = localStorage.getItem("Todos");
    return JSON.parse(todos || "[]");
  }
}

export default new ApiFrontend();
