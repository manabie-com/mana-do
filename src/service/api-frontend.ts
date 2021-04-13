import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk';

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      return Promise.resolve(mockToken);
    }

    return Promise.reject('Incorrect username/password');
  }

  async createTodo(content: string): Promise<Todo> {
    const token = localStorage.getItem('token');
    if (token) {
      return Promise.resolve({
        content,
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: 'firstUser'
      } as Todo);
    }

    return Promise.reject({
      status: 401
    });
  }

  async getTodos(): Promise<Todo[]> {
    console.log(JSON.parse(localStorage.getItem('todos') || ''));
    return JSON.parse(localStorage.getItem('todos') || '') || [];
  }
}

export default new ApiFrontend();
