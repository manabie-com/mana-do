import { Todo } from "../models/todo";

export const isValidCreate = (todos: Todo[], content: string): boolean =>
  !!(!todos.filter((todo) => todo.content === content).length && content);
