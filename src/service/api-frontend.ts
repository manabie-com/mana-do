import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

const mockToken = "testabc.xyz.ahk";
const todoPrefix = '__todo__';

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve(mockToken);
    }

    return Promise.reject("Incorrect username/password");
  }

  async createTodo(content: string): Promise<Todo> {
    const newId = shortid();
    const item: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: newId,
      user_id: "firstUser",
    };
    localStorage.setItem(`${todoPrefix}${newId}`, JSON.stringify(item));
    return Promise.resolve(item);
  }

  async getTodos(): Promise<Todo[]> {
    const keys = Object.keys(localStorage);
    const values: Todo[] = [];
    keys.forEach((key) => {
      if (key.indexOf(todoPrefix) === 0) {
        const itemStr = localStorage.getItem(key);
        if (itemStr?.length) {
          values.push(JSON.parse(itemStr));
        }
      }
    });
    return values.sort((a, b) => {
      const aDate = new Date(a.created_date);
      const bDate = new Date(b.created_date);
      if (aDate > bDate) {
        return 1;
      } else if (aDate < bDate) {
        return -1;
      }
      return 0;
    });
  }

  async deleteTodo(todoId: string): Promise<string | null> {
    const key = `${todoPrefix}${todoId}`;
    const itemStr = localStorage.getItem(key);
    if (itemStr) {
      localStorage.removeItem(key);
      return todoId;
    }
    return null;
  }

  async deleteAllTodos(): Promise<string[] | null> {
    const temp = Object.keys(localStorage);
    const todoKeys = temp.filter((x) => x.indexOf(todoPrefix) === 0);
    todoKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
    return todoKeys;
  }

  async updateTodo(todo: Todo): Promise<Todo | null> {
    if (!todo?.id) return null;
    const key = `${todoPrefix}${todo.id}`;
    localStorage.setItem(key, JSON.stringify(todo));
    return todo;
  }

  async updateTodos(todos: Todo[]): Promise<Todo[] | null> {
    if (!todos?.length) return null;
    const validTodos = todos.filter((x) => !!x.id);
    validTodos.forEach((item) => {
      const key = `${todoPrefix}${item.id}`;
      localStorage.setItem(key, JSON.stringify(item));
    });
    return validTodos;
  }
}

export default new ApiFrontend();
