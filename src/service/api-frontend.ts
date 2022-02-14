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
      user_id: 'firstUser',
    });
  }

  async deleteTodo(id: string): Promise<void> {
    return Promise.resolve();
  }

  async deleteAllTodos(): Promise<void> {
    return Promise.resolve();
  }

  async getTodos(): Promise<Todo[]> {
    return [
      {
        content: 'Content',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: 'firstUser',
      } as Todo,
    ];
  }

  async updateTodoStatus(id: string, completed: boolean): Promise<void> {
    return Promise.resolve();
  }

  async updateAllTodoStatus(completed: boolean): Promise<void> {
    return Promise.resolve();
  }
}

export default new ApiFrontend();
