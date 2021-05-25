import {Todo, TodoStatus} from "../models/todo";

export const STORED_TODO = 'STORED_TODO';

export const getStoredTodos = (): Todo[] => {
  const todos = localStorage.getItem(STORED_TODO);

  return todos ? JSON.parse(todos) : [];
}

export const storeTodo = (todo: Todo) => {
  const todos = getStoredTodos();
  todos.push(todo);

  localStorage.setItem(STORED_TODO, JSON.stringify(todos));
}

export const editStoredTodo = (todo: Todo) => {
  const todos = getStoredTodos();
  const updateIndex = todos.findIndex(item => item.id === todo.id);

  if (updateIndex > -1) {
    todos[updateIndex] = todo;
  }

  localStorage.setItem(STORED_TODO, JSON.stringify(todos));
}

export const deleteStoredTodo = (id: string) => {
  let todos = getStoredTodos();
  todos = todos.filter(item => item.id !== id)

  localStorage.setItem(STORED_TODO, JSON.stringify(todos));
}

export const deleteAllStoredTodo = () => {
  localStorage.removeItem(STORED_TODO);
}

export const toggleAllStoredTodo = (checked: boolean) => {
  const todos = getStoredTodos();
  for (const todo of todos) {
    todo.status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
  }

  localStorage.setItem(STORED_TODO, JSON.stringify(todos));
}
