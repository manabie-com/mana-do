import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const toDos = localStorage.getItem('todo-list');
class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const newContent = {
      content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    } as Todo;
    if (!toDos) {
      const newToDoList = [{ ...newContent }];
      console.log(newToDoList);
      localStorage.setItem('todo-list', JSON.stringify(newToDoList));
    } else {
      const newToDoList = JSON.parse(toDos);
      localStorage.setItem(
        'todo-list',
        JSON.stringify([...newToDoList, newContent])
      );
    }
    return Promise.resolve(newContent);
  }
  async updateTodo(id: string, status: TodoStatus): Promise<Partial<Todo>> {
    const toDos = localStorage.getItem('todo-list');
    if (!toDos) {
      return Promise.reject('Have an error when update Todo');
    }
    const newTodos = JSON.parse(toDos).map((todo: Todo) => {
      return {
        ...todo,
        status: todo.id === id ? status : todo.status,
      };
    });
    localStorage.setItem('todo-list', JSON.stringify(newTodos));
    return Promise.resolve({ id, status });
  }
  async deleteTodo(id: string): Promise<string> {
    if (!toDos) {
      return Promise.reject('Have an error when delete Todo');
    }

    const indexToDelete = JSON.parse(toDos).findIndex(
      (todo: Todo) => todo.id === id
    );

    if (indexToDelete === -1) {
      return 'Id not found';
    }
    const newArray = JSON.parse(toDos).filter((todo: Todo) => todo.id !== id);
    localStorage.setItem('todo-list', JSON.stringify(newArray));
    return 'Deleted';
  }
  async getTodos(): Promise<Todo[]> {
    if (!toDos) {
      localStorage.setItem('todo-list', JSON.stringify([]));
      return [];
    }
    return JSON.parse(toDos);
  }
  async deleteAllTodos(): Promise<string> {
    localStorage.setItem('todo-list', JSON.stringify([]));
    return Promise.resolve('Delete all completed');
  }
  async toggleAllTodos(checkAll: boolean): Promise<string> {
    if (!toDos) return Promise.reject('Have an error when toggle all todos');
    const newTodos = JSON.parse(toDos).map((todo: Todo): Todo => {
      return {
        ...todo,
        status: checkAll ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
      };
    });
    localStorage.setItem('todo-list', JSON.stringify(newTodos));
    return Promise.resolve('Toggle all completed');
  }
  async updateContentTodo(id: string, content: string): Promise<string> {
    if (!toDos) return Promise.reject('Have an error when update content todo');
    const newToDoList = JSON.parse(toDos).map((todo: Todo): Todo => {
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
