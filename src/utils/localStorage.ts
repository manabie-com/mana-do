import { Todo } from './../models/todo';

export const getCachedToken = () => localStorage.getItem('token');

export const cacheToken = (value: string) => {
  localStorage.setItem('token', value);
};

export const getCachedTodos = () => (JSON.parse(localStorage.getItem('todos')) as Todo[]) || [];

export const cacheTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
