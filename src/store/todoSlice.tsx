import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { TodoStatus } from '../constants/todo';
import Todo from '../models/todo';

interface TodoState {
  todoList: Todo[];
}

const initialState: TodoState = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList = state.todoList.concat([action.payload]);
    },
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    deleteAllTodo: (state) => {
      state.todoList = [];
    },
    toggleAllTodo: (state, action: PayloadAction<TodoStatus>) => {
      state.todoList = state.todoList.map((todo) => {
        todo.status = action.payload;
        return todo;
      });
    },
  },
});

export const {
  createTodo,
  setTodoList,
  deleteTodo,
  updateTodo,
  deleteAllTodo,
  toggleAllTodo,
} = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
