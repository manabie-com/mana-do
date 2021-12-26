import {IAPI} from './types';
import {Todo, TodoStatus, LocalKey} from '../models/todo';
import shortid from 'shortid';
import { getLocalStorage } from '../utils';

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async updateTodo(id: string,content: string): Promise<Todo> {

      const todos: Todo[] = getLocalStorage(LocalKey.TODO_LIST);
      const updateTodo = todos.find(todo => todo.id === id);

      return Promise.resolve({
          ...updateTodo,
          content: content,
          updated_date: new Date().toISOString(),
      } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
      const todos = getLocalStorage(LocalKey.TODO_LIST);

      return Promise.resolve({
        ...todos
      });
    }
}

export default new ApiFrontend();