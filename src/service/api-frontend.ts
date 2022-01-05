import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import {
  getLocalTodos,
  createLocalTodo,
  updateLocalTodo,
  deleteLocalTodo,
  deleteAllLocalTodos,
} from "utils/todos";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const newTodo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    };
    try {
      createLocalTodo(newTodo);
      return Promise.resolve(newTodo);
    } catch (error) {
      return Promise.reject(new Error("Can not create todo"));
    }
  }

  async getTodos(): Promise<Todo[]> {
    try {
      const todos = getLocalTodos();
      return Promise.resolve(todos);
    } catch (error) {
      return Promise.reject(new Error("Can not get todo list"));
    }
  }

  async deleteTodo(todoId: string): Promise<string> {
    try {
      deleteLocalTodo(todoId);
      return Promise.resolve(todoId);
    } catch (error) {
      return Promise.reject(new Error("Can not delete todo"));
    }
  }

  async deleteAllTodos(): Promise<void> {
    try {
      deleteAllLocalTodos();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("Can not delete all todos"));
    }
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    try {
      updateLocalTodo(todo);
      return Promise.resolve(todo);
    } catch (error) {
      return Promise.reject(new Error("Can not update todos"));
    }
  }
}

export default new ApiFrontend();
