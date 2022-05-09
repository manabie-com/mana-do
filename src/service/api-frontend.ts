import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    var min = 1;
    var max = 1000;
    var rand = min + Math.random() * (max - min);
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
      number_id: Date.now() + rand,
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return [
      {
        content: "Content",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      } as Todo,
    ];
  }
}

export default new ApiFrontend();
