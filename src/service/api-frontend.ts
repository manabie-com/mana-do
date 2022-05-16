import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { loadTodos, saveTodos } from './local-storage-service';

class ApiFrontend extends IAPI {
  async getTodos(): Promise<Todo[]> {
    return Promise.resolve(loadTodos() as Todo[]);
  }

  async createTodo(content: string): Promise<Todo> {
    const newTodo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    };
    const todos: Todo[] = [...(loadTodos<Todo[]>() || []), newTodo];
    saveTodos(todos);

    return Promise.resolve(newTodo as Todo);
  }

  async updateTodo(todoUpdate: Todo): Promise<Todo> {
    const newTodoList = loadTodos<Todo[]>()?.map((el) => {
      return todoUpdate.id === el.id ? { ...el, ...todoUpdate } : el;
    });

    newTodoList && saveTodos(newTodoList);

    return Promise.resolve(todoUpdate as Todo);
  }

  async deleteAllTodos(): Promise<boolean> {
    saveTodos([]);
    return Promise.resolve(true);
  }

  async deleteTodo(todoId: string): Promise<boolean> {
    saveTodos(loadTodos<Todo[]>()?.filter((el) => todoId !== el.id));
    return Promise.resolve(true);
  }

  async toggleAllTodos(checked: boolean): Promise<boolean> {
    saveTodos(loadTodos<Todo[]>()?.map((el) => ({ ...el, status: checked ? TodoStatus.COMPLETED: TodoStatus.ACTIVE })));
    return Promise.resolve(true);
  }
}

export default new ApiFrontend();
