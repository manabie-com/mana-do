import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

export const mockToken = 'testabc.xyz.ahk';

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === 'test@gmail.com' && password === '123') {
      return Promise.resolve(mockToken);
    }
    return Promise.reject('Incorrect username/password');
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser'
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return [];
  }

  async validateUse(token: string): Promise<boolean> {
    return token === mockToken;
  }
}

export default new ApiFrontend();
