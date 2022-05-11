import { Todo, TodoStatus } from '../models/todo';
import { addItem, clear, getItem, setItem } from './storage';

const todosKey = 'todos';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export const updateTodoStatus = (
  todos: Array<Todo>,
  id: string,
  checked: boolean
): Array<Todo> => {
  const updatedStatus = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

  return todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          status: updatedStatus,
        }
      : todo
  );
};

export const toggleAllTodos = (
  todos: Array<Todo>,
  checked: boolean
): Array<Todo> => {
  const toggledStatus = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

  return todos.map(todo => {
    return {
      ...todo,
      status: toggledStatus,
    };
  });
};

export const deleteTodo = (todos: Array<Todo>, id: string): Array<Todo> => {
  return todos.filter(todo => todo.id !== id);
};

export const editTodo = (
  todos: Array<Todo>,
  id: string,
  content: string
): Array<Todo> => {
  return todos.map(todo => (todo.id === id ? { ...todo, content } : todo));
};

export const getTodosStorage = (): Array<Todo> => {
  return getItem<Todo>(todosKey) || [];
};

export const addTodoStorage = (todo: Todo): void => {
  addItem<Todo>(todosKey, todo);
};

export const updateTodoStatusStorage = (id: string, checked: boolean): void => {
  const todos = getItem<Todo>(todosKey) || [];
  const result = updateTodoStatus(todos, id, checked);
  setItem<Todo>(todosKey, result);
};

export const toggleAllTodosStorage = (checked: boolean): void => {
  const todos = getItem<Todo>(todosKey) || [];
  const result = toggleAllTodos(todos, checked);
  setItem<Todo>(todosKey, result);
};

export const deleteAllTodos = (): void => {
  clear(todosKey);
};

export const deleteTodoStorage = (id: string): void => {
  const todos = getItem<Todo>(todosKey) || [];
  const result = deleteTodo(todos, id);
  setItem<Todo>(todosKey, result);
};

export const editTodoStorage = (id: string, content: string): void => {
  const todos = getItem<Todo>(todosKey) || [];
  const result = editTodo(todos, id, content);
  setItem<Todo>(todosKey, result);
};
