import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

export const mockToken = 'testabc.xyz.ahk';
export const todoListPlaceholder = 'todoList';

class ApiFrontend extends IAPI {
  /*
      Here we virtualize the backend functionalities,
      used localStorage instead of real database to persist the data
   */
  private todoList : Array<Todo> = new Array<Todo>();

  constructor() {
    super();
    const savedTodoList = localStorage.getItem(todoListPlaceholder);
    if (savedTodoList) {
      try {
        this.todoList = JSON.parse(savedTodoList);
      } catch (e) {
        localStorage.setItem(todoListPlaceholder, '');
        throw new Error('Bad data');
      }
    }

  }

  authorize(token: string): Promise<void> {
    if (token === mockToken) {
      return Promise.resolve();
    }
    return Promise.reject();
  }

  signIn(username: string, password: string): Promise<string>{
    if (username === 'firstUser' && password === 'example') {
      return Promise.resolve(mockToken)
    }

    return Promise.reject('Incorrect username/password')
  }

  createTodo(content: string): Promise<Todo> {
    const todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser'
    };
    this.todoList.push(todo);
    localStorage.setItem(todoListPlaceholder, JSON.stringify(this.todoList));
    return Promise.resolve(todo as Todo);
  }

  getTodos(): Promise<Todo[]>{
    return Promise.resolve(this.todoList);
  }

  deleteAllTodos(): Promise<void> {
    this.todoList = [];
    localStorage.setItem(todoListPlaceholder, JSON.stringify(this.todoList));
    return Promise.resolve();
  }

  deleteTodo(deletedTodoId: string): Promise<string> {
    const todoList = this.todoList;
    if (todoList.find(todo => todo.id === deletedTodoId)) {
      this.todoList = todoList.filter(todo => todo.id !== deletedTodoId);
      localStorage.setItem(todoListPlaceholder, JSON.stringify(this.todoList));
      return Promise.resolve(deletedTodoId);
    }
    return Promise.reject(`Cannot find todo with id ${deletedTodoId}`);
  }

  updateAllTodosStatuses(status: TodoStatus): Promise<TodoStatus> {
    this.todoList.forEach(todo => todo.status = status);
    localStorage.setItem(todoListPlaceholder, JSON.stringify(this.todoList));
    return Promise.resolve(status);
  }

  updateTodoData(updatedTodoId : string, data : {}) : Promise<Todo> {
    const todoList = this.todoList;
    const updatedTodo = todoList.find(todo => todo.id === updatedTodoId);
    if (updatedTodo) {
      Object.keys(data).forEach(key => (updatedTodo as any)[key] = (data as any)[key]);
      localStorage.setItem(todoListPlaceholder, JSON.stringify(this.todoList));
      return Promise.resolve(updatedTodo);
    }
    return Promise.reject(`Cannot find todo with id ${updatedTodoId}`);
  }

  updateTodoStatus(updatedTodoId: string, status: TodoStatus) : Promise<Todo> {
    return this.updateTodoData(updatedTodoId, { status });
  }

  updateTodoContent(updatedTodoId: string, content: string): Promise<Todo> {
    return this.updateTodoData(updatedTodoId, { content });

  }
}

export default new ApiFrontend();
