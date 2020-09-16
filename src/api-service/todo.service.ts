import shortId from 'shortid';
import { HttpAuth } from '../network/http';
import { ITodo, ETodoStatus } from '../types/todo';
import { API_TODO_BASE } from '../api-client/todo';


class TodoService extends HttpAuth {
  async create(content: string): Promise<ITodo> {
    const newTodo: ITodo = {
      content,
      created_date: new Date().toISOString(),
      id: shortId(),
      status: ETodoStatus.ACTIVE,
      user_id: 'firstUser'
    };
    return Promise.resolve(newTodo); 
  };

  async edit(id: string, content: string): Promise<ITodo> {
    if(id) {
      const updatedTodo: ITodo = {
      content,
      created_date: new Date().toISOString(),
      id: shortId(),
      status: ETodoStatus.ACTIVE,
      user_id: 'firstUser'
    };
    return Promise.resolve(updatedTodo) 
    }
    throw new Error('ID is not empty');
  };

  async delete(id: string): Promise<boolean> {
    if (id) {
      return Promise.resolve(true);
    }
    throw new Error('ID is not empty');
  }
  async deleteAll(): Promise<boolean> {
    return Promise.resolve(true);
  }
  async getList(): Promise<ITodo[]> {
    // await this.instance.get(API_TODO_BASE);
    return Promise.resolve([]);
  }
}

export default new TodoService();