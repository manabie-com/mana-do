import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
// import shortid from 'shortid';
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

    async createTodo(content: string): Promise<Todo> {
        const newTodoItem = {
          content,
          user_id: 'firstUser',
          status: TodoStatus.ACTIVE
        }
        return new Promise((resolve, reject) => {
          this.dbStore.save(newTodoItem, (resp: any) => {
            return resolve(resp[0]);
          }, null);
        })
        // return Promise.resolve({
        //     content: content,
        //     created_date: new Date().toISOString(),
        //     status: TodoStatus.ACTIVE,
        //     id: shortid(),
        //     user_id: 'firstUser'
        // } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        return new Promise((resolve, reject) => {
          this.dbStore.findAll((resp: any) => {
            return resolve(resp);
          });
        })
    }

    async updateTodo(todo: Todo): Promise<Todo> {
      const updatedData = {
        content: todo.content
      }
      return new Promise((resolve, reject) => {
        this.dbStore.save(updatedData, (resp: any) => {
          const newTodoItem = resp.find((item:any) => item.id === todo.id);
          return resolve(newTodoItem);
        }, todo.id);
      })
    }

}

export default new ApiFrontend();