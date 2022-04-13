import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      };

    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case UPDATE_TODO:
      const tempTodos3 = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload
        }

        return todo
      });

      return {
        ...state,
        todos: tempTodos3
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos2 = state.todos.map((todo) => ({
        ...todo,
        status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
      }))

      return {
        ...state,
        todos: tempTodos2
      }

    case DELETE_TODO:
      const tempTodos1 = state.todos.filter((todo) => todo.id !== action.payload);

      return {
        ...state,
        todos: tempTodos1
      }

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