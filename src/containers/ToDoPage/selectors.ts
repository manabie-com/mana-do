import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/RootState';
import { initialState, selectTodoById } from './slice';

const selectDomain = (state: RootState) => state.todoPage || initialState;

export const selectFilter = createSelector(
  [selectDomain],
  todoPageState => todoPageState.filter,
);

export const selectVisibleTodo = createSelector(
  [selectTodoById, selectFilter],
  (todo, filter) => {
    if (!todo) return null;

    if (filter !== 'ALL' && todo.status !== filter) return null;

    return todo;
  },
);
