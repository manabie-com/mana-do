import { Todo } from '../models/todo';

const STORE_TODOS_KEY = '@mana-do/todos';

const getTodosFromStorage = (): Todo[] => {
  return JSON.parse(localStorage.getItem(STORE_TODOS_KEY) || '[]');
};

const setTodosToStorage = (todos: Todo[]) => {
  localStorage.setItem(STORE_TODOS_KEY, JSON.stringify(todos));
};

export { getTodosFromStorage, setTodosToStorage };
