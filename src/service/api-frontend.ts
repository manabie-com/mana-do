import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { KEY_TODOS } from '../utils';

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      createdDate: new Date().toISOString(),
      status: TodoStatus.NEW,
      id: shortid(),
      userId: 'firstUser',
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    const todosLocal = await localStorage.getItem(KEY_TODOS);
    let todos: Todo[] = [];
    try {
      if (!!todosLocal) {
        todos = JSON.parse(todosLocal) || [];
      }
      return Promise.resolve(todos);
    } catch (err) {
      return Promise.resolve([]);
    }
  }
}

export default new ApiFrontend();
