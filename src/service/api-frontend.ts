import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import { User } from "../models/user";
import { IManaDo_DB, FullUser } from "../utils/localDatabase";
import { MANADO_DB } from "../constants";

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
      return Promise.resolve(mockToken + user.user_id); // Identify which token belongs to which user
    }

    return Promise.reject("Incorrect username/password");
  }

  // Get user info by token >> GET METHOD
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

  // Add user_id argument to know the sender >> POST METHOD
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

  // Get all todos by user_id >> GET METHOD
  async getTodos(user_id: string): Promise<Todo[]> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    return Promise.resolve(
      database.todos.filter((todo) => todo.user_id === user_id)
    );
  }

  // Get one todo by todoId >> GET METHOD
  async getTodo(todoId: string): Promise<Todo> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const todo = database.todos.find((todo) => todo.id === todoId) as Todo;

    if (todo) {
      return Promise.resolve(todo);
    }

    return Promise.reject("No todo found!");
  }

  // Delete one todo by todoId >> DELETE METHOD
  async removeTodo(todoId: string): Promise<Todo> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const todo = database.todos.find((todo) => todo.id === todoId) as Todo;

    if (todo) {
      const stringifiedTodo = JSON.stringify({
        ...database,
        todos: [...database.todos.filter((todo) => todo.id !== todoId)],
      } as IManaDo_DB);

      localStorage.setItem(MANADO_DB, stringifiedTodo);
      return Promise.resolve(todo);
    }

    return Promise.reject("No todo found!");
  }

  // Update all todo status owned user_id >> PUT METHOD
  async updateAllTodoStatus(
    isCompleted: boolean,
    user_id: string
  ): Promise<boolean> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const stringifiedDB = JSON.stringify({
      ...database,
      todos: [
        ...database.todos.map((todo) =>
          todo.user_id === user_id
            ? {
                ...todo,
                status: isCompleted ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
              }
            : todo
        ),
      ],
    } as IManaDo_DB);

    localStorage.setItem(MANADO_DB, stringifiedDB);

    return Promise.resolve(isCompleted);
  }

  // Update one todo status by todoId >> PUT METHOD
  async updateTodoStatus(
    todoId: string,
    isCompleted: boolean
  ): Promise<boolean> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const todo = database.todos.find((todo) => todo.id === todoId);

    if (todo) {
      const stringifiedDB = JSON.stringify({
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
      } as IManaDo_DB);

      localStorage.setItem(MANADO_DB, stringifiedDB);

      return Promise.resolve(isCompleted); // This should returns the updated todo, but...
    }

    return Promise.reject("Update failed");
  }

  // Update todo content by todoId >> PUT METHOD
  async updateTodoContent(todoId: string, content: string): Promise<Todo> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const todo = database.todos.find((todo) => todo.id === todoId);

    if (todo) {
      const stringifiedDB = JSON.stringify({
        ...database,
        todos: database.todos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              content: content,
            };
          }
          return {
            ...todo,
          };
        }),
      } as IManaDo_DB);

      localStorage.setItem(MANADO_DB, stringifiedDB);

      return Promise.resolve({
        ...todo,
        content: content,
      });
    }

    return Promise.reject("Update failed");
  }

  async removeAllTodoByType(userId: string, type: string): Promise<any> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const stringifiedDB = JSON.stringify({
      ...database,
      todos: database.todos.filter((todo) => {
        if (todo.status === type && todo.user_id === userId) {
          return false;
        }
        return true;
      }),
    } as IManaDo_DB);

    localStorage.setItem(MANADO_DB, stringifiedDB);

    return Promise.resolve();
  }

  async removeAllTodo(userId: string): Promise<any> {
    const database = JSON.parse(
      localStorage.getItem(MANADO_DB) || ""
    ) as IManaDo_DB;

    if (!database) {
      return Promise.reject("No database");
    }

    const stringifiedDB = JSON.stringify({
      ...database,
      todos: database.todos.filter((todo) => {
        if (todo.user_id === userId) {
          return false;
        }
        return true;
      }),
    } as IManaDo_DB);

    localStorage.setItem(MANADO_DB, stringifiedDB);

    return Promise.resolve();
  }
}

export default new ApiFrontend();
