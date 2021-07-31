import shortid from 'shortid';
import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';

const mockToken = 'testabc.xyz.ahk';

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
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
      user_id: 'firstUser',
    } as Todo);
  }

  // Return local storage data if available
  async getTodos(): Promise<Todo[]> {
    const storageTodos = localStorage.getItem('todos');

    if (storageTodos) {
      return JSON.parse(storageTodos);
    }

    return [];
  }
}

export default new ApiFrontend();
