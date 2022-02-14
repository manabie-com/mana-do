import { Todo, TodoStatus } from '../models/todo';
import axios from '../utils/axios';
import { IAPI } from './types';

class ApiFullstack extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<Todo>(`/tasks`, {
      content,
    });

    return resp.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`/tasks/${id}`);
  }

  async deleteAllTodos(): Promise<void> {
    await axios.delete(`/tasks`);
  }

  async getTodos(): Promise<Array<Todo>> {
    const resp = await axios.get<Array<Todo>>(`/tasks`);

    return resp.data;
  }

  async updateTodoStatus(id: string, completed: boolean): Promise<void> {
    await axios.patch<Todo>(`/tasks/${id}`, {
      status: completed ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
    });
  }

  async updateAllTodoStatus(completed: boolean): Promise<void> {
    await axios.patch(`/tasks`, {
      status: completed ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
    });
  }
}

export default new ApiFullstack();
