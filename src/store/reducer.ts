import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
} from './actions';
import { useReducer } from 'react';

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
      if(!state.todos.some(e => e.id === action.payload.id)){
        state.todos = [...state.todos, action.payload];
      }
      localStorage.setItem('todos', JSON.stringify(state.todos) )
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const data = state.todos.map((todo) => {
        if(todo.id === action.payload.todoId) {
          return {
            ...todo,
            status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
          }
        }
        return {...todo}
      })
      localStorage.setItem('todos', JSON.stringify(data) )
      return {
        todos: data
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      localStorage.setItem('todos', JSON.stringify(tempTodos) )

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const list = state.todos.filter((todo) => todo.id !== action.payload);

      localStorage.setItem('todos', JSON.stringify(list) )

      return {
        ...state,
        todos: list
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem('todos', JSON.stringify([]) )

      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export function useApiCallReducer() {
  return useReducer(reducer, initialState);
}
