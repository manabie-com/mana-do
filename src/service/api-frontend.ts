import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import { User } from "../models/user";
import { IManaDo_DB } from "../utils/dbType";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve(mockToken);
    }

    return Promise.reject("Incorrect username/password");
  }

  // Implement getUser api to get user info
  async getUser(token: string): Promise<User> {
    return Promise.resolve({
      user_id: "firstUser",
      username: "firstUser",
    } as User);
  }

  // Add user_id argument to know the sender
  async createTodo(content: string, user_id: string): Promise<Todo> {
    const database = JSON.parse(
      localStorage.getItem("MANADO_DB") || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const requestBody = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: user_id,
    } as Todo;

    database.todos.push(requestBody);

    return Promise.resolve(requestBody);
  }

  async getTodos(): Promise<Todo[]> {
    const database = JSON.parse(
      localStorage.getItem("MANADO_DB") || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    return Promise.resolve(database.todos);
  }
}

export default new ApiFrontend();
