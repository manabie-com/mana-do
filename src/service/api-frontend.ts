import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import { User } from "../models/user";

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
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: user_id,
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return [];
  }
}

export default new ApiFrontend();
