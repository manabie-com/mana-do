import { createAsyncThunk } from '@reduxjs/toolkit';
import Service from 'service';

export const createTodo = createAsyncThunk(
  'todoPage/createTodo',
  async (content: string) => {
    const todo = await Service.createTodo(content);
    return todo;
  },
);
