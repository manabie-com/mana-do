import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import { User } from "../models/user";
import { IManaDo_DB, FullUser } from "../utils/localDatabase";
import { AUTH_TOKEN, MANADO_DB } from "../constants";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const user = database.users.find(
      (user) => user.password === password && user.username === username
    ) as FullUser;

    if (user) {
      return Promise.resolve(mockToken + user.user_id);
    }

    return Promise.reject("Incorrect username/password");
  }

  // Implement getUser api to get user info
  async getUser(token: string): Promise<User> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const user = database.users.find(
      (user) => user.token === token
    ) as FullUser;

    if (user) {
      return Promise.resolve({
        username: user.username,
        user_id: user.user_id,
      });
    }

    return Promise.reject("No user found!");
  }

  // Add user_id argument to know the sender
  async createTodo(content: string, user_id: string): Promise<Todo> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
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
    localStorage.setItem(MANADO_DB, JSON.stringify(database));

    return Promise.resolve(requestBody);
  }

  async getTodos(): Promise<Todo[]> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    return Promise.resolve(database.todos);
  }

  async removeTodo(todoId: string): Promise<Todo> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const todo = database.todos.find((todo) => todo.id === todoId) as Todo;

    if (todo) {
      localStorage.setItem(
        MANADO_DB,
        JSON.stringify({
          ...database,
          todos: [...database.todos.filter((todo) => todo.id !== todoId)],
        } as IManaDo_DB)
      );
      return Promise.resolve(todo);
    }

    return Promise.reject("No todo found!");
  }

  async updateTodosStatus(isCompleted: boolean): Promise<boolean> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    localStorage.setItem(
      MANADO_DB,
      JSON.stringify({
        ...database,
        todos: [
          ...database.todos.map((todo) => ({
            ...todo,
            status: isCompleted ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          })),
        ],
      } as IManaDo_DB)
    );

    return Promise.resolve(isCompleted);
  }

  async updateTodoStatus(todoId: string, isCompleted: boolean): Promise<boolean> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    localStorage.setItem(
      MANADO_DB,
      JSON.stringify({
        ...database,
        todos: database.todos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              status: isCompleted ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
            };
          }
          return {
            ...todo,
          };
        }),
      } as IManaDo_DB)
    );

    return Promise.resolve(isCompleted);
  }
}

export default new ApiFrontend();
