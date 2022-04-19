import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const TODO_KEY = 'todos';

class ApiFrontend extends IAPI {
  private saveTodos(todos: Todo[]) {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }

  private clearTodos() {
    localStorage.removeItem(TODO_KEY);
  }

  private todos(): Todo[] {
    const strTodos = localStorage.getItem(TODO_KEY);
    try {
      return JSON.parse(strTodos || '[]');
    } catch {
      localStorage.removeItem(TODO_KEY);
    }

    return [];
  }

  async createTodo(content: string): Promise<Todo> {
    const todo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    };

    const todos = this.todos();
    todos.push(todo);
    this.saveTodos(todos);

    return todo;
  }

  async getTodos(): Promise<Todo[]> {
    return this.todos();
  }

  async deleteTodo(id: string): Promise<Todo | null> {
    const todos = this.todos();
    const todo = todos.find((el) => el.id === id);
    if (todo) {
      const filteredTodos = todos.filter((el) => el.id !== id);
      this.saveTodos(filteredTodos);
    }

    return todo || null;
  }

  async deleteAllTodos(): Promise<Todo[]> {
    const todos = this.todos();
    this.clearTodos();

    return todos;
  }

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo | null> {
    const todos = this.todos();
    const _todo = todos.find((el) => el.id === id);
    if (_todo) {
      const _todos = todos.map((el) =>
        el.id === id ? { ...el, ...todo } : { ...el }
      );
      this.saveTodos(_todos);

      return { ..._todo, ...todo };
    }

    return null;
  }

  async toggleAllTodos(checked: boolean): Promise<Todo[]> {
    const todos = this.todos();
    const _todos = todos.map((el) => {
      return {
        ...el,
        status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
      };
    });
    this.saveTodos(_todos);

    return _todos;
  }
}

export default new ApiFrontend();
