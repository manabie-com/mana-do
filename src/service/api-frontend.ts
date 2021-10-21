import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve(mockToken);
    }

    return Promise.reject("Incorrect Username/Password");
  }

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
    const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "");
    return todos || [];
  }

  async updateTodo(todos: Array<Todo>): Promise<boolean> {
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(true);
  }

  async deleteAll(): Promise<boolean> {
    localStorage.removeItem("todos");
    return Promise.resolve(true);
  }
}

export default new ApiFrontend();
