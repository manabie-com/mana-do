import { Todo, TodoStatus } from '../models/todo';
import { setLocalStorage } from '../utils/index';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  SET_TODO,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      const todos = action.payload;

      setLocalStorage(todos);

      return {
        ...state,
        todos,
      };
    }
    case CREATE_TODO: {
      const todos = [...state.todos, action.payload];

      setLocalStorage(todos);

      return {
        ...state,
        todos,
      };
    }
    case UPDATE_TODO_STATUS: {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.status = action.payload.checked
            ? TodoStatus.COMPLETED
            : TodoStatus.ACTIVE;
        }
        return todo;
      });

      setLocalStorage(todos);

      return {
        ...state,
        todos,
      };
    }
    case UPDATE_TODO_CONTENT: {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.content = action.payload.content;
        }
        return todo;
      });

      setLocalStorage(todos);

      return {
        ...state,
        todos,
      };
    }

    case TOGGLE_ALL_TODOS: {
      const todos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      setLocalStorage(todos);

      return {
        ...state,
        todos,
      };
    }

    case DELETE_TODO: {
      const todos = state.todos.filter((todo) => todo.id !== action.payload);

      setLocalStorage(todos);

      return {
        ...state,
        todos,
      };
    }
    case DELETE_ALL_TODOS: {
      setLocalStorage([]);

      return {
        ...state,
        todos: [],
      };
    }
    default:
      return state;
  }
}

export default reducer;
