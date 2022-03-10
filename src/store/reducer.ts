import { Todo } from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
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
        todos: action.payload,
      };

    case CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ]
      };

    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            todo.status = action.payload.status;
            return todo;
          }
          return todo;
        })
      }

    case TOGGLE_ALL_TODOS:
      return {
        ...state,
        todos: state.todos.map((e)=>{
          return {
            ...e,
            status: action.payload
          }
        })
      }

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
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