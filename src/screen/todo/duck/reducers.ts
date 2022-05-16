import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ErrorStatus from '../../../models/error';
import LoadingStatus from '../../../models/loading';
import { Todo, TodoStatus } from '../../../models/todo';
import actions from './actions';

export interface TodoState {
  todoList: Todo[];
  loading?: string;
  error?: ErrorStatus;
}

const initialState: TodoState = { todoList: [] };

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getTodos
    builder.addCase(actions.getTodos.pending, (state) => {
      state.loading = LoadingStatus.loading;
    });

    builder.addCase(actions.getTodos.fulfilled, (state, action) => ({
      ...state,
      loading: LoadingStatus.idle,
      todoList: action.payload,
    }));

    builder.addCase(actions.getTodos.rejected, (state) => ({
      ...state,
      loading: LoadingStatus.idle,
      error: ErrorStatus.failed,
    }));

    // getTodos
    builder.addCase(actions.createTodo.pending, (state) => {
      state.loading = LoadingStatus.loading;
    });

    builder.addCase(actions.createTodo.fulfilled, (state, action) => ({
      ...state,
      loading: LoadingStatus.idle,
    }));

    builder.addCase(actions.createTodo.rejected, (state) => ({
      ...state,
      loading: LoadingStatus.idle,
      error: ErrorStatus.failed,
    }));
  },
});

// export const {} = todosSlice.actions;
export default todosSlice.reducer;
