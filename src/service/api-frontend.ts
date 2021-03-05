import { userConfig } from "./../config/user";
import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

// mockToken will be taken from config file
// if there is a need for modify, only change config file
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
    // create new todo
    const todo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    };

    // get all data todos from localstorage
    // and push new todo item
    const data = JSON.parse(localStorage.getItem(userConfig.dbName) || "[]");
    data.push(todo);
    try {
      // update localstorage with new data
      localStorage.setItem("todos", JSON.stringify(data));
    } catch (error) {
      // localstorage limited to about 5MB,
      // localstorage bigger 5MB => setItem throw error
      console.log(error);
      return Promise.reject({
        response: {
          status: 401,
        },
      });
    }

    return Promise.resolve(todo);
  }

  async getTodos(): Promise<Todo[]> {
    // create default todo for first login or list todos of localStorage empty
    const defaultTodos = [
      {
        content: "Login to Todo app!",
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        id: shortid(),
        user_id: "firstUser",
      },
    ];

    try {
      const todos = JSON.parse(localStorage.getItem(userConfig.dbName) || "[]");

      // sort by created_date
      if (Array.isArray(todos) && todos.length > 0) {
        todos.sort((a: Todo, b: Todo) =>
          a.created_date > b.created_date ? -1 : 1
        );

        return Promise.resolve(todos);
      }
    } catch (error) {
      console.log(error.message);
    }

    return Promise.resolve(defaultTodos);
  }
}

export default new ApiFrontend();
