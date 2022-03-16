import { Todo } from "../models/todo";
import { TODO_LIST } from "../constants";

export const getTodoList = (): Todo[] => {
  if (typeof window !== "undefined") {
    const todoList = localStorage.getItem(TODO_LIST);
    if (!todoList) return [];
    try {
      const parseTodoList = JSON.parse(todoList);
      return parseTodoList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return [];
};

export const addTodoList = (todoList: Todo[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
  }
};

export const removeTodoList = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TODO_LIST);
  }
};
