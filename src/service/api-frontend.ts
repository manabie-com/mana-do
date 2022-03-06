import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

const prefix = 'manabie-todo-challenge';

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    try {
      // check if new todo item is existing from the list
      // to avoid duplicate data and multiple calls of StrictMode
      const todos = await this.getTodos();
      const isExisting = todos.some((todo) => todo.content === content);
      if (isExisting) {
        return Promise.reject('Todo Item Already Exists');
      }

      // initialize new todo item
      const id = `${prefix}-${shortid()}`;
      const newTodo: Todo = {
        content,
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id,
        user_id: "firstUser"
      };

      // add new todo item in localStorage
      localStorage.setItem(id, JSON.stringify(newTodo));

      return Promise.resolve(newTodo);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTodos(): Promise<Todo[]> {
    try {
      const todos: Todo[] = [];
      const items = { ...localStorage };
      // get all todo item keys with given prefix to avoid inclusion of other data
      const todoKeys = Object.keys(items)
        .filter((item) => item.includes(prefix));

      todoKeys.forEach((key) => {
        const item = localStorage.getItem(key);
        const todo = item && JSON.parse(item);

        // display ACITVE or COMPLETED status only
        if (todo && todo.status !== TodoStatus.DELETED) {
          todos.push(todo as Todo);
        }
      });

      return Promise.resolve(todos);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateTodo(id: string, type: string, value: string): Promise<Todo> {
    try {
      // get item from localStorage
      const item = localStorage.getItem(id);
      const todo = item && JSON.parse(item);

      // update todo item by given type
      todo[type] = value;
      localStorage.setItem(id, JSON.stringify(todo));

      return Promise.resolve(todo as Todo);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new ApiFrontend();
