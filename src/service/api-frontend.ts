import { IAPIFE } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const getLocalStorageValue = () => {
  const saved = localStorage.getItem('todos');
  return saved ? (JSON.parse(saved) as Todo[]) : [];
};
class ApiFrontend extends IAPIFE {
  async getTodos(): Promise<Todo[]> {
    return getLocalStorageValue();
  }

  async createTodo(content: string): Promise<Todo> {
    const savedTodos = getLocalStorageValue();
    const newTodo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    };
    localStorage.setItem('todos', JSON.stringify([...savedTodos, newTodo]));
    return newTodo;
  }

  async updateTodoStatus(todoId: string, checked: boolean): Promise<Todo[]> {
    const savedTodos = getLocalStorageValue();

    const index2 = savedTodos.findIndex((todo) => todo.id === todoId);
    savedTodos[index2].status = checked
      ? TodoStatus.COMPLETED
      : TodoStatus.ACTIVE;

    localStorage.setItem('todos', JSON.stringify([...savedTodos]));
    return savedTodos;
  }

  async toggleAllTodo(checked: boolean): Promise<Todo[]> {
    const savedTodos = getLocalStorageValue();

    const tempTodos = savedTodos.map((e) => {
      return {
        ...e,
        status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
      };
    });

    localStorage.setItem('todos', JSON.stringify([...tempTodos]));
    return tempTodos;
  }

  async deleteAllTodo(): Promise<Todo[]> {
    localStorage.clear();
    return [];
  }

  async deleteTodo(todoId: string): Promise<Todo[]> {
    const savedTodos = getLocalStorageValue();
    const index1 = savedTodos.findIndex((todo) => todo.id === todoId);

    savedTodos.splice(index1, 1);
    localStorage.setItem('todos', JSON.stringify([...savedTodos]));
    return savedTodos;
  }

  async updateTodoContent(todoId: string, content: string): Promise<Todo[]> {
    const savedTodos = getLocalStorageValue();
    const index1 = savedTodos.findIndex((todo) => todo.id === todoId);

    savedTodos[index1].content = content;
    localStorage.setItem('todos', JSON.stringify([...savedTodos]));
    return savedTodos;
  }
}

export default new ApiFrontend();
