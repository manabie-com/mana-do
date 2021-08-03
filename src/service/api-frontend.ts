import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import DBStore from './api-store';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    dbStore = new DBStore('todo_db');
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo[]> {
        const newTodoItem = {
          content,
          user_id: 'firstUser',
          status: TodoStatus.ACTIVE
        }
        return new Promise((resolve, reject) => {
          this.dbStore.save(newTodoItem, (resp: any) => {
            return resolve(resp);
          }, null);
        })
    }

    async getTodos(): Promise<Todo[]>{
        return new Promise((resolve, reject) => {
          this.dbStore.findAll((resp: any) => {
            return resolve(resp);
          });
        })
    }

    async updateTodo(todo: Partial<Todo>): Promise<Todo[]> {
      const updatedData = {
        content: todo.content
      }
      return new Promise((resolve, reject) => {
        this.dbStore.save(updatedData, (resp: any) => {
          return resolve(resp);
        }, todo.id);
      })
    }

    async verifyToken(token: string): Promise<string> {
      if (token === mockToken) {
        return Promise.resolve(token);
      }
  
      return Promise.reject("Token is invalid");
    }
    async deleteTodo(id: string): Promise<Todo[]> {
      return new Promise((resolve, reject) => {
        this.dbStore.delete((resp: any) => {
          return resolve(resp);
        }, id);
      })
    }

    async deleteAllTodos(): Promise<Todo[]> {
      return new Promise((resolve, reject) => {
        this.dbStore.drop((resp: any) => {
          return resolve(resp);
        });
      })
    }

    async toggleAllTodos(status: TodoStatus): Promise<Todo[]> {
      const updatedData = {status}
      return new Promise((resolve, reject) => {
        this.dbStore.updateAll(updatedData, (resp: any) => {
          return resolve(resp);
        });
      })
    }

    async updateTodoStatus(todo: Partial<Todo>): Promise<Todo[]> {
      const updatedData = {
        status: todo.status
      }
      return new Promise((resolve, reject) => {
        this.dbStore.save(updatedData, (resp: any) => {
          return resolve(resp);
        }, todo.id);
      })
    }
}

export default new ApiFrontend();