import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo, TodoStatus } from '../../../models/todo';
import Service from '../../../service';
import { AppState } from '../../../store';
import selectors from './selectors';

const getTodos = createAsyncThunk('GET_TODOS', async (_, { rejectWithValue }) => {
  try {
    const response = await Service.getTodos();
    return response;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const createTodo = createAsyncThunk(
  'CREATE_TODOS',
  async (content: string, { rejectWithValue, dispatch }) => {
    try {
      await Service.createTodo(content);
      return dispatch(getTodos());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

type UpdateTodoStatusParam = {
  todoId: string;
  checked: boolean;
};
const updateTodoStatus = createAsyncThunk(
  'UPDATE_TODOS',
  async (params: UpdateTodoStatusParam, { rejectWithValue, getState, dispatch }) => {
    const { todoId, checked } = params;
    const state = getState() as AppState;
    const todoList = selectors.selectTodo(state);
    const todoUpdate: Todo = todoList?.filter((el) => el.id === todoId)?.[0];
    if (todoUpdate) {
      const newTodo = { ...todoUpdate, status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE };
      try {
        await Service.updateTodo(newTodo);
        return dispatch(getTodos());
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  }
);

type UpdateTodoContentParam = {
  todoId: string;
  content: string;
};
const onUpdateTodoContent = createAsyncThunk(
  'UPDATE_TODOS',
  async (params: UpdateTodoContentParam, { rejectWithValue, getState, dispatch }) => {
    const { todoId, content } = params;
    const state = getState() as AppState;
    const todoList = selectors.selectTodo(state);
    const todoUpdate: Todo = todoList?.filter((el) => el.id === todoId)?.[0];
    if (todoUpdate) {
      const newTodo = { ...todoUpdate, content };
      try {
        await Service.updateTodo(newTodo);
        return dispatch(getTodos());
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  }
);

const toggleAllTodos = createAsyncThunk(
  'UPDATE_TODOS',
  async (checked: boolean, { rejectWithValue, getState, dispatch }) => {
    const state = getState() as AppState;

    try {
      await Service.toggleAllTodos(checked);
      return dispatch(getTodos());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const deleteTodo = createAsyncThunk(
  'DELETE_TODOS',
  async (todoId: string, { rejectWithValue, dispatch }) => {
    try {
      await Service.deleteTodo(todoId);
      return dispatch(getTodos());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const deleteAllTodos = createAsyncThunk(
  'DELETE_ALL_TODOS',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await Service.deleteAllTodos();
      return dispatch(getTodos());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export default {
  getTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
  deleteAllTodos,
  toggleAllTodos,
  onUpdateTodoContent,
};
