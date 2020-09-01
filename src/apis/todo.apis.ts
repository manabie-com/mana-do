import { TodoStatus } from './../models/todo';
import { delay } from '../utils';
import { getCachedTodos, cacheTodos } from '../utils/localStorage';
import shortid from 'shortid';

import { Todo } from '../models/todo';

const mockToken = 'testabc.xyz.ahk';

export const signIn = async (username: string, password: string): Promise<string> => {
  if (username === 'firstUser' && password === 'example') {
    return Promise.resolve(mockToken);
  }

  return Promise.reject('Incorrect username/password');
};

export const createTodo = async (content: string): Promise<Todo> => {
  const todos = getCachedTodos();

  const newTodo: Todo = {
    content: content,
    created_date: new Date().toISOString(),
    status: 'ACTIVE',
    id: shortid(),
    user_id: 'firstUser',
  };

  const augmentedTodos = [...todos, newTodo];

  cacheTodos(augmentedTodos);

  await delay(100);

  return newTodo;
};

export const getTodos = async (): Promise<Todo[]> => {
  await delay(1000);

  return getCachedTodos();
};

export const updateTodoStatus = async (todoId: string, status: TodoStatus) => {
  const todos = getCachedTodos();

  const toBeUpdatedTodoIndex = todos.findIndex((todo) => todo.id === todoId);

  const updatedTodo: Todo = { ...todos[toBeUpdatedTodoIndex], status };

  const updatedTodos = [...todos.slice(0, toBeUpdatedTodoIndex), updatedTodo, ...todos.slice(toBeUpdatedTodoIndex + 1)];

  await delay(100);

  cacheTodos(updatedTodos);
};

export const deleteTodo = async (todoId: string) => {
  const todos = getCachedTodos();

  const toBeDeletedTodoIndex = todos.findIndex((todo) => todo.id === todoId);

  const updatedTodos = [...todos.slice(0, toBeDeletedTodoIndex), ...todos.slice(toBeDeletedTodoIndex + 1)];

  await delay(100);

  cacheTodos(updatedTodos);
};

export const updateAllTodosStatus = async (status: TodoStatus) => {
  const todos = getCachedTodos();

  const updatedTodos = todos.map((todo) => ({ ...todo, status }));

  await delay(100);

  cacheTodos(updatedTodos);
};

export const deleteAllTodos = async () => {
  await delay(100);

  cacheTodos([]);
};

export const updateTodoContent = async (todoId: string, content: string) => {
  const todos = getCachedTodos();

  const toBeUpdatedTodoIndex = todos.findIndex((todo) => todo.id === todoId);

  const updatedTodo: Todo = { ...todos[toBeUpdatedTodoIndex], content };

  const updatedTodos = [...todos.slice(0, toBeUpdatedTodoIndex), updatedTodo, ...todos.slice(toBeUpdatedTodoIndex + 1)];

  await delay(100);

  cacheTodos(updatedTodos);
};
