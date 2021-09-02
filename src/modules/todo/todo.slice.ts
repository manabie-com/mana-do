import { createSlice } from '@reduxjs/toolkit';
import Service from '../../service';
import { Todo, TodoStatus } from '../../models/todo';

import { storeItem, TODOS_KEY } from '../../utils/localstorage';

export const todoSlice = createSlice({
  name: 'signIn',
  initialState: {
    todos: [] as Todo[],
    addTodoError: null,
    updateTodoSuccess: null,
    updateTodoFailed: null,
  },
  reducers: {
    addTodoSuccess: (state, action) => {
      const newTodo = action.payload;
      if (newTodo) {
        state.todos.push(newTodo);
      }
      storeItem(TODOS_KEY, state.todos);
    },
    addTodoFailed: (state, action) => {
      state.addTodoError = action.payload;
    },
    loadTodoListSuccess: (state, action) => {
      state.todos = action.payload;
    },
    updateTodoStatus: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if (index > -1) {
        state.todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      }
      state.updateTodoSuccess = action.payload;
      storeItem(TODOS_KEY, state.todos);
    },
    updateTodoFailed: (state, action) => {
      state.updateTodoFailed = action.payload;
    },
    updateTodoContent: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if (index > -1) {
        state.todos[index].content = action.payload.content;
      }
      storeItem(TODOS_KEY, state.todos);
    },
    toggleAllTodos: (state, action) => {
      const todos = state.todos.map(item => {
        return {
          ...item,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      });
      state.todos = todos;
      storeItem(TODOS_KEY, state.todos);
    },
    deleteAllTodos: (state, action) => {
      state.todos = [];
      storeItem(TODOS_KEY, state.todos);
    },
    deleteTodoItem: (state, action) => {
      const index = state.todos.findIndex(item => item && item.id === action.payload);
      if (index > -1) {
        state.todos.splice(index, 1);
      }
      storeItem(TODOS_KEY, state.todos);
    },
  }
});

export const { addTodoSuccess, addTodoFailed } = todoSlice.actions

export const addTodo = (content: string) => async (dispatch: any) => {
  try {
    const response = await Service.createTodo(content);
    dispatch(addTodoSuccess(response));
  } catch (err) {
    dispatch(addTodoFailed(err));
  }
};

export const { loadTodoListSuccess } = todoSlice.actions

export const getTodoList = () => async (dispatch: any) => {
  const response = await Service.getTodos();
  dispatch(loadTodoListSuccess(response));
};

const { updateTodoStatus, updateTodoFailed, toggleAllTodos, deleteAllTodos, deleteTodoItem, updateTodoContent } = todoSlice.actions

export const updateTodoItemStatus = (todoId: string, checked: boolean) => async (dispatch: any) => {
  try {
    const todoRequest = {
      todoId, checked
    }
    dispatch(updateTodoStatus(todoRequest));
  } catch (err) {
    dispatch(updateTodoFailed(err));
  }
};

export const updateTodoItemContent = (todoId: string, content: string) => async (dispatch: any) => {
  try {
    const todoRequest = {
      todoId, content
    }
    dispatch(updateTodoContent(todoRequest));
  } catch (err) {
    dispatch(updateTodoFailed(err));
  }
};

export const toggleTodos = (checked: boolean) => async (dispatch: any) => {
  try {
    dispatch(toggleAllTodos(checked));
  } catch (err) {
    dispatch(updateTodoFailed(err));
  }
};

export const deleteTodos = () => async (dispatch: any) => {
  dispatch(deleteAllTodos(null));
};

export const deleteTodo = (id: string) => async (dispatch: any) => {
  dispatch(deleteTodoItem(id));
};

export default todoSlice.reducer

