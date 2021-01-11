import { IAPI } from "./types";
import { Todo } from "../models/todo";
import { TodoStatus } from "../constant";
import shortid from "shortid";
import { token as mockToken } from "../constant";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve(mockToken);
    }

    return Promise.reject("Incorrect username/password");
  }
  async signOut() {
    localStorage.removeItem("token");
    return Promise.resolve("logout successful");
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

  async getTodos(): Promise<Array<Todo>> {
    const defaultData = [
      {
        content: "Hello to Manabie! (This is the Default!)",
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        id: `${shortid()}`,
        user_id: "firstUser",
      },
    ];
    const todoData: string = localStorage.getItem("todoData") || "[]";
    const dataTodo = JSON.parse(todoData);

    if (Array.isArray(dataTodo) && dataTodo.length > 0) {
      return Promise.resolve(dataTodo as Array<Todo>);
    }

    return Promise.resolve(defaultData as Array<Todo>);
  }
}

export default new ApiFrontend();
