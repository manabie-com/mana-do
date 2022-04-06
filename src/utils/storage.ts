import { STORAGE_KEY } from "./constants";
import { Todo } from "../models/todo";

// Updated: this function is used to set todo list into localStorage
export const setToStorage = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// Updated: this function is used to get todo list from localStorage
export const getFromStorage = (): Todo[] => {
  const stringTodos = localStorage.getItem(STORAGE_KEY);
  return stringTodos ? JSON.parse(stringTodos) : [];
};
