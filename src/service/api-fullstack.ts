import { AxiosResponse } from 'axios';

import { IAPI } from './types';
import { Todo } from '../models/todo';
import axios from '../utils/axios';

class ApiFullstack extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
      content
    });

    return resp.data.data;
  }

  async getTodos(): Promise<Array<Todo>> {
    const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

    return resp.data.data;
  }

  async updateTodo(id: string, type: string, value: string): Promise<Todo> {
    throw new Error('Method not implemented.');
  }
}


export default new ApiFullstack();