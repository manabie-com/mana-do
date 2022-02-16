import shortid from 'shortid';
import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';

class ApiFrontend extends IAPI {
    setItem(todos: Todo[]): void{
        localStorage.setItem('@todo/list', JSON.stringify(todos));
      }

    async createTodo(content: string): Promise<Todo> {
        const todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser',
          } as Todo;
      
          const todos = await this.getTodos();
          todos.push(todo);
          this.setItem(todos);

          return Promise.resolve(todo);
    }

    async getTodos(): Promise<Todo[]> {
        const list = localStorage.getItem('@todo/list');
        return Promise.resolve(!!list ? JSON.parse(list) : [] as Todo[]);
    }
}

export default new ApiFrontend();
