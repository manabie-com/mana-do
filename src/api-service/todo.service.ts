import shortId from 'shortid';
import { HttpClient } from '../network/http';
import { ITodo, ETodoStatus } from '../types/todo';


class TodoService extends HttpClient {
  async create(content: string): Promise<ITodo> {
    const newTodo: ITodo = {
      content,
      created_date: new Date().toISOString(),
      id: shortId(),
      status: ETodoStatus.ACTIVE,
      user_id: 'firstUser'
    };
    return Promise.resolve(newTodo) 
  };

  async edit(id: string, content: string): Promise<boolean> {
    if(id) {
      return Promise.resolve(true);
    }
    throw new Error('ID is not empty');
  };

  async delete(id: string): Promise<boolean> {
    if (id) {
      return Promise.resolve(true);
    }
    throw new Error('ID is not empty');
  }
  async getList(): Promise<ITodo[]> {
    return Promise.resolve([]);
  }
}

export default new TodoService();