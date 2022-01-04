import { IAPI } from './types';
import {Todo, TodoStatus} from '../models/todo';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

class ApiFullstack extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
      content,
    });

    return resp.data.data;
  }

  async getTodos(): Promise<Array<Todo>> {
    const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

    return resp.data.data;
  }

  async removeTodo(todo: Todo): Promise<Array<Todo>> {
    return [];
  }

  async updateTodo(todoId: string, content: string, status: TodoStatus): Promise<void> {
    return Promise.resolve();
  }
}

export default new ApiFullstack();
