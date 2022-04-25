import shortid from 'shortid';

import { Todo, TodoStatus } from '../models/todo';
import { IAPI } from './types';

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
      toggle: true,
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return [
      {
        content: "Content",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
        toggle: true,
      } as Todo,
    ];
  }
}

export default new ApiFrontend();
