import {Todo} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  UPDATE_TODOS,
  UPDATE_TODO,
  SET_TODO,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        todos: [...state.todos, action.payload]
      };
    case SET_TODO: {
      return {
        todos: [...action.payload]
      }
    }
    case UPDATE_TODO:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[index2] = action.payload;
      return {
        ...state,
        todos: [...state.todos]
      }

    case UPDATE_TODOS:
      return {
        ...state,
        todos: action.payload,
      }

    case DELETE_TODO:
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index >= 0) {
        return {
          todos: [...state.todos.splice(index, 1)]
        }
      }
      return state;
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;