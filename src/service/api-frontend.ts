import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<Object> {
    if (username === "firstUser" && password === "example") {
      const loginTime = new Date().getTime();
      return Promise.resolve({
        token: mockToken,
        username: "firstUser",
        loginTime: loginTime,
      });
    }
    return Promise.reject("102");
  }
  /*
    fake data api - save data to local storage
    add some new api : update, delete all
   */
  async createTodo(content: string): Promise<Todo> {
    try {
      const newTodo = {
        content: content,
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      };

      let listTodos: any = localStorage.getItem("listTodos") || "[]"; 
      listTodos = JSON.parse(listTodos);
      listTodos.push(newTodo);
      localStorage.setItem("listTodos", JSON.stringify(listTodos));
      return Promise.resolve(newTodo as Todo);
    } catch (error) {
      return Promise.reject("501");
    }
  }
  async updateTodo(field: any, value: any, id: string): Promise<Todo> {
    try {
      let listTodos: any = localStorage.getItem("listTodos") || "[]"; // fake data api - save to local storage
      listTodos = JSON.parse(listTodos);
      const index = listTodos.findIndex((todo: any) => todo.id === id);
      listTodos[index][field] = value;
      localStorage.setItem("listTodos", JSON.stringify(listTodos));
      return Promise.resolve(listTodos[index] as Todo);
    } catch (error) {
      return Promise.reject("501");
    }
  }
  async deleteTodo(id: string): Promise<Todo[]> {
    let listTodos: any = localStorage.getItem("listTodos") || "[]"; //fake api delete todo in localstorage
    listTodos = JSON.parse(listTodos);
    const index = listTodos.findIndex((todo: any) => todo.id === id);
    if (index > -1) {
      listTodos.splice(index, 1);
    }
    localStorage.setItem("listTodos", JSON.stringify(listTodos));
    return Promise.resolve(listTodos);
  }
  async getTodos(): Promise<Todo[]> {
    let listTodos: any = localStorage.getItem("listTodos") || "[]";
    listTodos = JSON.parse(listTodos);
    return Promise.resolve(listTodos);
  }
  async deleteAllTodo(): Promise<String> {
    let listTodos: any = [];
    localStorage.setItem("listTodos", JSON.stringify(listTodos));
    return Promise.resolve("200");
  }
  async updateAllTodo(status: Boolean): Promise<String> {
    let listTodos: any = localStorage.getItem("listTodos") || "[]";
    listTodos = JSON.parse(listTodos);
    listTodos &&
      listTodos.length &&
      listTodos.map((v: Todo) => {
        v.status = status ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      });
    localStorage.setItem("listTodos", JSON.stringify(listTodos));
    return Promise.resolve("200");
  }
}

export default new ApiFrontend();
