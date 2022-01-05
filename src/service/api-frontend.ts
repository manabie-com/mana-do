import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

const TODOS_KEY = "TODOS";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    } as Todo;

    const todos = await this.getTodos();

    todos.push(todo);

    this.persistTodos(todos)

    return Promise.resolve(todo);
  }

  async getTodos(): Promise<Todo[]> {
    return Promise.resolve(
      JSON.parse(localStorage.getItem(TODOS_KEY) ?? "[]") as Todo[]
    );
  }
  
  persistTodos(todos: Todo[]): void{
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }
}

export default new ApiFrontend();
