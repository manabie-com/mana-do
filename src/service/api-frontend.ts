import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    } as Todo);
  }

  getTodos(): Todo[] {
    const stringify = localStorage.getItem("todos");
    const todos = stringify ? JSON.parse(stringify) : [];
    return todos;
  }

  persistentTodos(todos: Todo[]) {
    const stringify = JSON.stringify(todos);
    localStorage.setItem("todos", stringify);
  }
}

export default new ApiFrontend();
