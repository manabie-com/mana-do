import { Todo } from "../models/todo";

const getLocalStorageTodo = () => {
  const todos = localStorage.getItem("todos");
  let currentTodo: Todo[] = [];
  if (todos) {
    currentTodo = JSON.parse(todos);
  }
  return currentTodo;
};

const setLocalStorageTodo = (todos: Todo[]): void => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export {
  getLocalStorageTodo,
  setLocalStorageTodo
};