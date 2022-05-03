import { Todo } from '../types/types';

export const isValid = (todos: Todo[], content: string) => !todos.filter((todo) => todo.content === content).length;
