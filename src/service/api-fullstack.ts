import { IAPI } from './types';
import { Todo } from '../models/todo';
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

  updateTodoStatus(id: string, checked: boolean): Promise<void> {
    return Promise.resolve<void>(undefined);
  }
  deleteTodo(id: string): Promise<void> {
    return Promise.resolve<void>(undefined);
  }
  toggleAllTodos(checked: boolean): Promise<void> {
    return Promise.resolve<void>(undefined);
  }
  deleteAllTodos(): Promise<void> {
    return Promise.resolve<void>(undefined);
  }
  editTodo(id: string, content: string): Promise<void> {
    return Promise.resolve<void>(undefined);
  }
}

export default new ApiFullstack();
