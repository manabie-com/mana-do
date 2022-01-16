import { Todo } from '../models/todo';
import { Theme, ThemeType } from 'models/theme';
import { AppActions } from './actions';
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  TOGGLE_THEME,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from './action-types';

export interface AppState {
  todos: Array<Todo>,
  theme?: Theme
}

export const initialState: AppState = {
  todos: [],
  theme: ThemeType.LIGHT
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      const tempTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: tempTodos
      };
    }

    case UPDATE_TODO_STATUS: {
      const { todoId, status } = action.payload;
      const tempTodos = state.todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            status
          }
        } 
        return todo
      });
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
      return {
        ...state,
        todos: tempTodos
      }
    }

    case TOGGLE_ALL_TODOS: {
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload
        }
      })
      return {
        ...state,
        todos: tempTodos
      }
    }

    case DELETE_TODO: {
      const tempTodos = [...state.todos];
      const index = tempTodos.findIndex((todo) => todo.id === action.payload);
      tempTodos.splice(index, 1);
      return {
        ...state,
        todos: tempTodos
      }
    }

    case DELETE_ALL_TODOS: {
      return {
        ...state,
        todos: []
      }
    }
    case TOGGLE_THEME: {
      return {
        ...state,
        theme: action.payload
      }
    }

    default:
      return state;
  }
}

export default reducer;