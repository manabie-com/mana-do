import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'
const todosKey = 'todos';

class ApiFrontend extends IAPI {
  signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      return Promise.resolve(mockToken)
    }

    return Promise.reject('Invalid username or password')
  }

  async createTodo(content: string): Promise<Todo> {
    const newTodo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser'
    };
    const todos = await this.getTodos();
    localStorage.setItem(todosKey, JSON.stringify([newTodo, ...todos]));

    return newTodo;
  }

  async getTodos(): Promise<Todo[]> {
    const todosString = localStorage.getItem(todosKey);
    if (!todosString) {
      return []
    }
    return JSON.parse(todosString as string);
  }

  async updateTodo(id: string, content?: string | undefined, status?: TodoStatus | undefined): Promise<Todo> {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error("Not found");
    }
    const todo = todos[todoIndex];
    if (content) {
      todo.content = content as string;
    }
    if (status) {
      todo.status = status as unknown as TodoStatus;
    }
    todos[todoIndex] = todo;
    localStorage.setItem(todosKey, JSON.stringify(todos));
    return todo;
  }

  async removeTodo(id: string): Promise<string> {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error("Not found");
    }
    todos.splice(todoIndex, 1);
    localStorage.setItem(todosKey, JSON.stringify(todos));
    return id;
  }

  async updateTodos(todos: Todo[]): Promise<Todo[]> {
    localStorage.setItem(todosKey, JSON.stringify(todos));
    return todos;
  }
}

export default new ApiFrontend();