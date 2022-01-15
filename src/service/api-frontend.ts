import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { STORAGED_TODOS_KEY } from 'constants/global';
import { getFromLocalStorage } from 'storage';

class ApiFrontend extends IAPI {
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
    const todos = getFromLocalStorage(STORAGED_TODOS_KEY) as Todo[];
    return Promise.resolve(todos || []);
  }
}

export default new ApiFrontend();