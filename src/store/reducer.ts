import { Todo, TodoStatus } from '../models/todo';
import { Theme, ThemeType } from 'models/theme';
import { AppActions } from './actions';
import {
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  TOGGLE_THEME,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT
} from './action-types';
import { STORAGED_THEME_KEY, STORAGED_TODOS_KEY } from 'constants/global';
import { getFromLocalStorage, savetoLocalStorage } from 'storage';

export interface AppState {
  todos: Array<Todo>,
  theme?: Theme
}

export const initialState: AppState = {
  todos: [],
  theme: getFromLocalStorage(STORAGED_THEME_KEY) as Theme || ThemeType.LIGHT
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action?.type) {
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload
      };
    }
    case CREATE_TODO: {
      const tempTodos = [
        ...state.todos, 
        action.payload
      ];
      savetoLocalStorage(STORAGED_TODOS_KEY, tempTodos);
      return {
        ...state,
        todos: tempTodos
      };
    }

    case UPDATE_TODO_STATUS: {
      const { todoId, checked } = action.payload;
      const tempTodos = state.todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
          }
        } 
        return todo
      });
      savetoLocalStorage(STORAGED_TODOS_KEY, tempTodos);
      return {
        ...state,
        todos: tempTodos
      }
    }

    case UPDATE_TODO_CONTENT: {
      const { todoId, content } = action.payload;
      const tempTodos = state.todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            content
          }
        } 
        return todo
      });
      savetoLocalStorage(STORAGED_TODOS_KEY, tempTodos);
      return {
        ...state,
        todos: tempTodos
      }
    }

    case TOGGLE_ALL_TODOS: {
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      savetoLocalStorage(STORAGED_TODOS_KEY, tempTodos);
      return {
        ...state,
        todos: tempTodos
      }
    }

    case DELETE_TODO: {
      const tempTodos = [...state.todos];
      const index = tempTodos.findIndex((todo) => todo.id === action.payload);
      tempTodos.splice(index, 1);
      savetoLocalStorage(STORAGED_TODOS_KEY, tempTodos);
      return {
        ...state,
        todos: tempTodos
      }
    }

    case DELETE_ALL_TODOS: {
      localStorage.removeItem(STORAGED_TODOS_KEY);
      return {
        ...state,
        todos: []
      }
    }

    case TOGGLE_THEME: {
      const theme = state.theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
      savetoLocalStorage(STORAGED_THEME_KEY, theme);
      return {
        ...state,
        theme
      }
    }

    default:
      return state;
  }
}

export default reducer;