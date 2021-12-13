import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

export const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo> {
      return Promise.resolve({
          content: content,
          created_date: new Date().toISOString(),
          status: TodoStatus.ACTIVE,
          id: shortid(),
          user_id: 'firstUser'
      } as Todo);
    }

    //Create mock API call for edit
    async editTodo(todo: Todo): Promise<Todo> {
      return Promise.resolve(todo)
    }

    async getTodos(): Promise<Todo[]>{
      const todos = localStorage.getItem('todos')
      if (todos) {
        return JSON.parse(todos)
      }

      return []
    }
}

export default new ApiFrontend();