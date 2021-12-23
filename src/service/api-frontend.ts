import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

class ApiFrontend extends IAPI {
  getTodoListInLocalStorage(): Array<Todo> {
    const toDos = localStorage.getItem('todo-list');
    if (!toDos) {
      localStorage.setItem('todo-list', JSON.stringify([]));
      return [];
    }
    return JSON.parse(toDos);
  }
  async createTodo(content: string): Promise<Todo> {
    const newContent = {
      content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    } as Todo;
    const toDos = this.getTodoListInLocalStorage();
    localStorage.setItem('todo-list', JSON.stringify([...toDos, newContent]));
    return Promise.resolve(newContent);
  }
  async updateTodo(id: string, status: TodoStatus): Promise<Partial<Todo>> {
    const toDos = this.getTodoListInLocalStorage();
    const newTodos = toDos.map((todo: Todo) => {
      return {
        ...todo,
        status: todo.id === id ? status : todo.status,
      };
    });
    localStorage.setItem('todo-list', JSON.stringify(newTodos));
    return Promise.resolve({ id, status });
  }
  async deleteTodo(id: string): Promise<string> {
    const toDos = this.getTodoListInLocalStorage();

    const indexToDelete = toDos.findIndex((todo: Todo) => todo.id === id);

    if (indexToDelete === -1) {
      return 'Id not found';
    }
    const newArray = toDos.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem('todo-list', JSON.stringify(newArray));
    return 'Deleted';
  }
  async getTodos(): Promise<Todo[]> {
    const toDos = this.getTodoListInLocalStorage();
    return toDos;
  }
  async deleteAllTodos(): Promise<string> {
    localStorage.setItem('todo-list', JSON.stringify([]));
    return Promise.resolve('Delete all completed');
  }
  async toggleAllTodos(checkAll: boolean): Promise<string> {
    const toDos = this.getTodoListInLocalStorage();
    const newTodos = toDos.map((todo: Todo): Todo => {
      return {
        ...todo,
        status: checkAll ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
      };
    });
    localStorage.setItem('todo-list', JSON.stringify(newTodos));
    return Promise.resolve('Toggle all completed');
  }
  async updateContentTodo(id: string, content: string): Promise<string> {
    const toDos = this.getTodoListInLocalStorage();
    const newToDoList = toDos.map((todo: Todo): Todo => {
      return {
        ...todo,
        content: id === todo.id ? content : todo.content,
      };
    });
    localStorage.setItem('todo-list', JSON.stringify(newToDoList));
    return Promise.resolve('ok');
  }
}

export default new ApiFrontend();
