import { createSelector } from 'reselect';

import { TodoStatus } from '../constants/todo';
import Todo from '../models/todo';
import { RootState } from '../store';

const selectTodoList = (state: RootState) => state.todo.todoList;

export const filterTodoByStatus = (status: TodoStatus) =>
  createSelector(selectTodoList, (todoList): Todo[] => {
    if (status === TodoStatus.ALL) {
      return todoList;
    } else {
      return todoList.filter((todo) => {
        return todo.status === status;
      });
    }
  });

export const sumTodoActive = () =>
  createSelector(selectTodoList, (todoList): number =>
    todoList.reduce(
      (todoComplete, todo) =>
        todo.isTodoActive() ? todoComplete + 1 : todoComplete,
      0
    )
  );
