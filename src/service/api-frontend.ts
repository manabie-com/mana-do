import { IAPI } from "./types";
import { Todo, TodoStatus } from "types";
import { nanoid } from "nanoid";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: nanoid(),
      user_id: "firstUser",
    } as any);
  }

  async getTodos(): Promise<Todo[]> {
    return [
      {
        content: "Content",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: nanoid(),
        user_id: "firstUser",
      } as any,
    ];
  }
}

export default new ApiFrontend();
