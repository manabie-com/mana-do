import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT
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
        ...state,
        // remove directly editing the state.
        todos: [action.payload, ...state.todos]
      };

    case UPDATE_TODO_STATUS:
      return {
        ...state,
        // remove directly editing the state.
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            todo.status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
          }
          return todo
        })
      }

    case TOGGLE_ALL_TODOS:
      return {
        ...state,
        // remove directly editing the state.
        todos: state.todos.map((todo) => {
          return {
            ...todo,
            status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
          }
        })
      }

    case DELETE_TODO:
      return {
        ...state,
        // remove directly editing the state.
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }
    case UPDATE_TODO_CONTENT:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            todo.content = action.payload.content
          }
          return todo
        })
      }
    default:
      return state;
  }
}

export default reducer;