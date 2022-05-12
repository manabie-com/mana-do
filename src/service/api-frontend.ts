import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import { nanoid } from 'nanoid';
import {
  addTodoStorage,
  deleteAllTodos as deleteAllTodosStorage,
  deleteTodoStorage,
  editTodoStorage,
  getTodosStorage,
  toggleAllTodosStorage,
  updateTodoStatusStorage,
} from '../utils';

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const todo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: nanoid(),
      user_id: 'firstUser',
    };
    addTodoStorage(todo);

    return Promise.resolve(todo);
  }

  async getTodos(): Promise<Todo[]> {
    return getTodosStorage();
  }

  async updateTodoStatus(id: string, checked: boolean): Promise<void> {
    updateTodoStatusStorage(id, checked);

    return Promise.resolve<void>(undefined);
  }

  async deleteTodo(id: string): Promise<void> {
    deleteTodoStorage(id);

    return Promise.resolve<void>(undefined);
  }

  async toggleAllTodos(checked: boolean): Promise<void> {
    toggleAllTodosStorage(checked);

    return Promise.resolve<void>(undefined);
  }

  async deleteAllTodos(): Promise<void> {
    deleteAllTodosStorage();

    return Promise.resolve<void>(undefined);
  }

  async editTodo(id: string, content: string): Promise<void> {
    editTodoStorage(id, content);

    return Promise.resolve<void>(undefined);
  }
}

export default new ApiFrontend();
