import shortid from 'shortid';

import { Todo, TodoStatus } from '../models/todo';
import { User } from '../models/user';
import { IAPI } from './types';

class ApiFrontend extends IAPI {
  updateTodo(id: string, status: TodoStatus): Promise<Todo> {
    throw new Error('Method not implemented.');
  }
  deleteTodo(id: string): Promise<Todo> {
    throw new Error('Method not implemented.');
  }
  deleteTodos(userId?: string): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  async createTodo({ userId, content }: { userId: string; content: string }): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: userId,
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return [];
  }

  async getUsers(): Promise<User[]> {
    return [];
  }
}

export default new ApiFrontend();
