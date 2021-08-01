import { IAPI } from "./types";
import { ITodo } from "../modules/todo/store/todo.constant";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve(mockToken);
    }

    return Promise.reject("Incorrect username/password");
  }

  async verifyToken(token: string): Promise<string> {
    if (token === mockToken) {
      return Promise.resolve(token);
    }

    return Promise.reject("Token is invalid");
  }

  async getTodos(): Promise<ITodo[]> {
    const todos = localStorage.getItem("todos");
    if (!todos) {
      return [];
    }
    return JSON.parse(todos);
  }

  async createTodo(todo: ITodo): Promise<ITodo[]> {
    const todos = await this.getTodos();
    const newTodos = [todo, ...todos];
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return Promise.resolve(newTodos);
  }

  async deleteTodo(id: string): Promise<ITodo[]> {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return Promise.reject("Not found item");
    }
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(todos);
  }

  async updateTodo(id: string, data: Partial<ITodo>): Promise<ITodo[]> {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return Promise.reject("Not found item");
    }
    const todo = {
      ...todos[todoIndex],
      ...data,
    };
    todos[todoIndex] = todo;
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(todos);
  }

  async updateAllTodos(data: Partial<ITodo>): Promise<ITodo[]> {
    const todos = await this.getTodos();
    const newTodos = todos.map((todo) => ({
        ...todo,
        ...data
    }))
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return Promise.resolve(newTodos);
  }
}

export default new ApiFrontend();
