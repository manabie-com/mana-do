import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import * as Constant from "../common/constants";

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const todo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: Constant.DUMMY_USER,
    };
    const todos: Todo[] = await this.getTodos();
    todos.push(todo);
    localStorage.setItem(Constant.TODOS, JSON.stringify(todos));
    return todo;
  }

  async getTodos(): Promise<Todo[]> {
    const todos = localStorage.getItem(Constant.TODOS);
    return JSON.parse(todos || "[]");
  }

  async deleteAllTodos(): Promise<void> {
    localStorage.removeItem(Constant.TODOS);
  }

  async deleteTodo(todo: Todo): Promise<Todo[]> {
    const todosRes = await this.getTodos();
    const newTodos = todosRes.filter(e => e.id !== todo.id);
    localStorage.setItem(Constant.TODOS, JSON.stringify(newTodos));
    return newTodos;
  }

  async toggleAllTodos(todos: Todo[], status: TodoStatus): Promise<Todo[]> {
    const todosRes = await this.getTodos();
    todos.forEach((e) => (e.status = status));
    const newTodo = todosRes.map((todo) => {
      return { ...todo, status: status } as Todo;
    });
    localStorage.setItem(Constant.TODOS, JSON.stringify(newTodo));
    return newTodo;
  }

  async updateTodo(todo: Todo): Promise<Todo[]> {
    const todosRes = await this.getTodos();
    const itemUpdatedIndex = todosRes.findIndex((e) => e.id === todo.id);
    todosRes[itemUpdatedIndex] = todo;
    localStorage.setItem(Constant.TODOS, JSON.stringify(todosRes));
    return todosRes;
  }
}

export default new ApiFrontend();
