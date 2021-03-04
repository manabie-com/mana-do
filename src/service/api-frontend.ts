import { userConfig } from "./../config/user";
import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

// const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve(userConfig.mockToken);
    }

    return Promise.reject("Incorrect username/password");
  }

  async createTodo(content: string): Promise<Todo> {
    // change
    const todo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    };

    const data = JSON.parse(localStorage.getItem(userConfig.dbName) || "[]");
    data.push(todo);
    try {
      localStorage.setItem("todos", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }

    return Promise.resolve(todo);
  }

  async getTodos(): Promise<Todo[]> {
    // change

    const defaultTodos = [
      {
        content: "Welcome to Manabie!",
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        id: shortid(),
        user_id: "firstUser",
      },
    ];

    try {
      const todos = JSON.parse(localStorage.getItem(userConfig.dbName) || "[]");
      if (Array.isArray(todos) && todos.length > 0) {
        return Promise.resolve(todos);
      }
    } catch (error) {
      console.log(error.message);
    }

    return Promise.resolve(defaultTodos);
  }
}

export default new ApiFrontend();
