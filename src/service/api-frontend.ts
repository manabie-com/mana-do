import { IAPI } from './types';
import { Todo, TodoStatus } from 'models/todo';
import shortid from 'shortid';
export const TOKEN = 'testabc.xyz.ahk';
export const USER = {
  username: 'firstUser',
  password: 'example',
};

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === USER.username && password === USER.password) {
      return Promise.resolve(TOKEN);
    }

    return Promise.reject('Incorrect username/password');
  }

  async verifyToken(token: string): Promise<void> {
    if (token === TOKEN) {
      return Promise.resolve();
    }
    return Promise.reject('Invalid token');
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: USER.username,
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return [];
  }
}

export default new ApiFrontend();
