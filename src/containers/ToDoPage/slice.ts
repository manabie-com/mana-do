import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Todo, TodoStatus } from 'models/todo';
import { RootState } from 'store/RootState';
import { createTodo } from './thunks';

export const adapter = createEntityAdapter<Todo>();

export const initialState = adapter.getInitialState({
  filter: 'ALL',
});

const todoPageSlice = createSlice({
  name: 'todoPage',
  initialState,
  reducers: {
    deleteTodo: adapter.removeOne,
    deleteAllTodos: adapter.removeAll,
    updateTodo: adapter.updateOne,
    completeAllTodos(state) {
      state.ids.forEach(id => {
        const todo = state.entities[id];
        if (todo) {
          todo.status = TodoStatus.COMPLETED;
        }
      });
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createTodo.fulfilled, adapter.addOne);
  },
});

export const { actions, reducer, name: sliceKey } = todoPageSlice;
export const {
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = adapter.getSelectors<RootState>(state => state.todoPage);
