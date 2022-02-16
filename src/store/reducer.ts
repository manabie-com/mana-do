import {Todo, TodoStatus} from '../models/todo';
import { AppActions } from './actions';
import ActionTypes from './actionTypes';

export interface AppState {
  todos: Array<Todo>
  status: any;
}

export const initialState: AppState = {
  todos: [],
  status: 'ALL',
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.CREATE_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

      case ActionTypes.UPDATE_TODO_STATUS: {
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.todoId
        );
        const todos = [...state.todos];
  
        todos[todoIndex] = {
          ...state.todos[todoIndex],
          status: action.payload.checked
            ? TodoStatus.COMPLETED
            : TodoStatus.ACTIVE,
        };
  
        return {
          ...state,
          todos
        };
      }

    case ActionTypes.TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case ActionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload)
      }
    case ActionTypes.DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case ActionTypes.SET_TODO:
      return { ...state, todos: action.payload }

    case ActionTypes.SET_TODO_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;