import { delay } from './../utils';
import { getCachedTodos, cacheTodos } from './../utils/localStorage';
import shortid from 'shortid';

import { Todo } from './../models/todo';

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

  delay(1000);

  return newTodo;
};

export const getTodos = async (): Promise<Todo[]> => {
  await delay(2000);

  return getCachedTodos();
};

export const updateTodo = (updatedTodo: Todo) => {
  const todos = getCachedTodos();

  const oldTotoItemIndex = todos.findIndex(({ id }) => id === updatedTodo.id);

  const newTodos = [...todos.slice(0, oldTotoItemIndex), updatedTodo, ...todos.slice(oldTotoItemIndex + 1)];

  delay(1000);

  cacheTodos(newTodos);
};
