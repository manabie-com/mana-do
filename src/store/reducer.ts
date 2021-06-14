import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      return {...state, todos: [...action.payload]};
    }
    case CREATE_TODO: {
      if (!state.todos.includes(action.payload)) {
        state.todos.push(action.payload);
        localStorage.setItem('todoList', JSON.stringify(state.todos));
      }

      return {...state};
    }
    case UPDATE_TODO_STATUS: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem('todoList', JSON.stringify(state.todos));

      return {...state};
    }
    case UPDATE_TODO_CONTENT: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index].content = action.payload.content;
      localStorage.setItem('todoList', JSON.stringify(state.todos));

      return {...state};
    }
    case TOGGLE_ALL_TODOS: {
      state.todos.forEach((todo) => {
        todo.status = action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      });
      localStorage.setItem('todoList', JSON.stringify(state.todos));

      return {...state};
    }
    case DELETE_TODO: {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todoList', JSON.stringify(state.todos));

      return {...state};
    }
    case DELETE_ALL_TODOS: {
      localStorage.removeItem('todoList');
      return {...state, todos: []};
    }
    default: {
      return {...state};
    }
  }
}

export default reducer;
