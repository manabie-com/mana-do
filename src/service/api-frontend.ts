import { IAPI } from './types';
import { Todo, TodoStatus, TODO_KEYS } from '../models/todo';
import shortid from 'shortid';
import { LOGIN_KEYS } from '../models/auth';
import { AUTH_VALUE } from '../resource/constant';

class ApiFrontend extends IAPI {
  userId = localStorage.getItem(LOGIN_KEYS.userId);
  userPassword = localStorage.getItem(LOGIN_KEYS.password);

  async signIn(username: string, password: string): Promise<string> {
    if (username === this.userId && password === this.userPassword) {
      return Promise.resolve(AUTH_VALUE.token);
    }

    return Promise.reject('Incorrect username/password');
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: this.userId,
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    const todosList = localStorage.getItem(TODO_KEYS.todos);
    return todosList ? Promise.resolve(JSON.parse(todosList) as Todo[]) : [];
  }
}

export default new ApiFrontend();
