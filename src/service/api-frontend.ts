import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk';

class ApiFrontend extends IAPI {
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
  }

  async signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      localStorage.setItem('token', mockToken);

      return Promise.resolve(mockToken);
    }

    return Promise.reject('Incorrect username/password');
  }

  async signOut() {
    localStorage.removeItem('token');

    return Promise.resolve();
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    const json = localStorage.getItem('todoList');
    let result = [];

    if (json) {
      try {
        result = JSON.parse(json).map((item: any) => item as Todo);
      } catch ({message}) {
        console.error(message);
      }
    }

    return Promise.resolve(result);
  }
}

export default new ApiFrontend();
