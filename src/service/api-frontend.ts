import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import { Profile } from "../models/user";
import shortid from "shortid";

const mockToken = "testabc.xyz.ahk";
const MANA_KEY = "MANADO";

class ApiFrontend extends IAPI {
  async authorize(token: string): Promise<Profile> {
    return new Promise((resolve, reject) => {
      if (token === mockToken) {
        setTimeout(() => {
          resolve({
            role: "user",
            name: "John Doe",
          });
        }, 1000);
        return;
      }
      setTimeout(() => {
        reject({
          role: "visitor",
        });
      }, 1000);
    });
  }

  async signIn(username: string, password: string): Promise<string> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve(mockToken);
    }
    return Promise.reject("Incorrect username/password");
  }

  async getTodos(): Promise<Todo[]> {
    try {
      let ids: string[] = [];
      let todos: Todo[] = [];
      const raw = localStorage.getItem(MANA_KEY);
      if (raw) {
        ids = JSON.parse(raw);
      }
      if (ids.length === 0) {
        return [];
      }
      for (let i = 0; i <= ids.length; i++) {
        const rawTodo = localStorage.getItem(ids[i]);
        if (rawTodo) {
          const todo = JSON.parse(rawTodo) as Todo;
          todos.push(todo);
        }
      }
      return Promise.resolve(todos);
    } catch (error) {
      return Promise.reject("Can not get todos!");
    }
  }

  async getTodo(id: string): Promise<Todo> {
    try {
      let todo: Todo | null = null;
      const raw = localStorage.getItem(id);
      if (raw) {
        todo = JSON.parse(raw) as Todo;
      }
      if (todo) {
        return Promise.resolve(todo);
      }
      return Promise.reject("Todo not found");
    } catch (error) {
      return Promise.reject("Can not get todo!");
    }
  }

  async updateTodo(id: string, newTodo: Todo): Promise<string> {
    try {
      let ids: string[] = [];
      const rawIds = localStorage.getItem(MANA_KEY);
      if (rawIds) {
        ids = JSON.parse(rawIds);
      }
      if (ids.length === 0 || ids.indexOf(id) === -1) {
        return Promise.reject("Todo not found");
      }
      localStorage.setItem(id, JSON.stringify(newTodo));
      return Promise.resolve("success");
    } catch (error) {
      return Promise.reject("Can not update todo!");
    }
  }

  async createTodo(content: string): Promise<Todo> {
    try {
      const newId: string = shortid();
      const newTodo: Todo = {
        id: newId,
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        user_id: "firstUser",
        content: content,
      };

      let ids: string[] = [];
      let raw = localStorage.getItem(MANA_KEY);
      if (raw) {
        ids = JSON.parse(raw) as string[];
      }
      ids.push(newId);
      localStorage.setItem(MANA_KEY, JSON.stringify(ids));
      localStorage.setItem(newId, JSON.stringify(newTodo));

      return Promise.resolve({
        content: content,
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      } as Todo);
    } catch (error) {
      return Promise.reject("Can not create todo");
    }
  }

  async deleteTodo(todoId: string): Promise<string> {
    try {
      let ids: string[] = [];
      const rawIds = localStorage.getItem(MANA_KEY);
      if (rawIds) {
        ids = JSON.parse(rawIds);
      }
      if (ids.length === 0 || ids.indexOf(todoId) === -1) {
        return Promise.reject("Todo not found");
      }
      ids = ids.filter((id) => id !== todoId);
      localStorage.removeItem(todoId);
      return Promise.resolve("success");
    } catch (error) {
      return Promise.reject("Can not delete todo");
    }
  }

  async deleteAllTodos(): Promise<string> {
    try {
      let ids: string[] = [];
      const rawIds = localStorage.getItem(MANA_KEY);
      if (rawIds) {
        ids = JSON.parse(rawIds) || [];
      }
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        if (id) {
          localStorage.removeItem(id);
        }
      }
      localStorage.setItem(MANA_KEY, "[]");
      return Promise.resolve("success");
    } catch (error) {
      return Promise.reject("Can not delete todos");
    }
  }
}

export default new ApiFrontend();
