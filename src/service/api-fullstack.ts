import { AxiosResponse } from 'axios';

import { Todo, TodoStatus } from '../models/todo';
import { User } from '../models/user';
import axios from '../utils/axios';
import { IAPI } from './types';

class ApiFullstack extends IAPI {
  async updateTodo(id: string, status: TodoStatus): Promise<Todo> {
    return axios
      .put<AxiosResponse<Todo>>(`/tasks/${id}`, {
        status,
      })
      .then((resp) => resp.data.data);
  }

  async deleteTodo(id: string): Promise<Todo> {
    return axios.delete<AxiosResponse<Todo>>(`/tasks/${id}`).then((resp) => resp.data.data);
  }

  async deleteTodos(userId?: string): Promise<Todo> {
    return axios.delete<AxiosResponse<Todo>>(`/tasks?userId=${userId}`).then((resp) => resp.data.data);
  }

  async createTodo({ userId, content }: { userId: string; content: string }): Promise<Todo> {
    return axios
      .post<AxiosResponse<Todo>>(`/tasks`, {
        userId,
        content,
      })
      .then((resp) => resp.data.data);
  }

  async getTodos(userId: string): Promise<Array<Todo>> {
    return axios.get<AxiosResponse<Array<Todo>>>(`/tasks?userId=${userId}`).then((resp) => resp.data.data);
  }

  async getUsers(): Promise<User[]> {
    return axios.get<AxiosResponse<Array<User>>>(`/users`).then((resp) => resp.data.data);
  }
}

export default new ApiFullstack();
