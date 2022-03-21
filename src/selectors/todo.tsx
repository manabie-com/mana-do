import { TodoStatus } from '../constants/todo';
import Todo from '../models/todo';

export const filterTodoByStatus = (
  status: TodoStatus,
  todoList: Array<Todo>
) => {
  if (status === TodoStatus.ALL) {
    return todoList;
  } else {
    return todoList.filter((todo) => {
      return todo.status === status;
    });
  }
};

export const sumTodoActive = (todoList: Array<Todo>) => {
  return todoList.reduce(
    (todoComplete, todo) =>
      todo.isTodoActive() ? todoComplete + 1 : todoComplete,
    0
  );
};

export const findTodoWithTodoId = (todoId: string, todoList: Array<Todo>) => {
  return todoList.find((todo) => todo.id === todoId) || null;
};
