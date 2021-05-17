import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve(mockToken);
    }

    return Promise.reject("Incorrect username/password");
  }

  async createTodo(content: string): Promise<Todo> {
    const newTodo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    };
    const todos = await this.getTodos();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(newTodo as Todo);
  }
  async updateTodo(todoId: string, name: string, value: any): Promise<Todo> {
    const todos = await this.getTodos();
    const todoUpdateIndex = todos.findIndex((x) => x.id === todoId);
    if (todoUpdateIndex > -1) {
      todos[todoUpdateIndex][name] = value;
      localStorage.setItem("todos", JSON.stringify(todos));
      return Promise.resolve(todos[todoUpdateIndex]);
    }
    return Promise.reject({} as Todo);
  }
  deleteAllTodo(): Promise<boolean> {
    localStorage.setItem("todos", JSON.stringify([]));
    return Promise.resolve(true);
  }

  async getTodos(): Promise<Todo[]> {
    const todoFromLocalStorage = localStorage.getItem("todos");
    if (todoFromLocalStorage) {
      const result = JSON.parse(todoFromLocalStorage) as Todo[];
      return result;
    }
    return [];
  }
}

export default new ApiFrontend();
