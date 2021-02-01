import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
// import Auth from './auth';
import { getRandomColor } from 'utils';

const mockToken = 'testabc.xyz.ahk';
class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      // Auth.authenticate(() => {});
      return Promise.resolve(mockToken);
    }
    return Promise.reject({
      statusCode: 401,
      message: 'Incorrect username/password'
    });
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
      color: getRandomColor()
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return JSON.parse(localStorage.getItem('todos') || '{}') || [];
  }
}

export default new ApiFrontend();
