import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import {
  getTodosLocalStorage,
  removeTodoItemFromLocalStorage,
  saveTodoItemToLocalStorage,
  updateTodoItemLocalStorage,
} from '../utils';

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    };
    saveTodoItemToLocalStorage(todo);
    return Promise.resolve(todo as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    const todoList = getTodosLocalStorage();
    return Promise.resolve(todoList);
  }

  async removeTodo(todo: Todo): Promise<Todo[]> {
    const updatedTodos = removeTodoItemFromLocalStorage(todo);

    return Promise.resolve(updatedTodos as Array<Todo>);
  }

  async updateTodo(todoId: string, content: string, status: TodoStatus): Promise<void> {
    updateTodoItemLocalStorage(todoId, content, status);
    return Promise.resolve();
  }
}

export default new ApiFrontend();
