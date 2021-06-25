import { EnhanceTodoStatus } from './../context/TodoContext'
import { Todo, TodoStatus } from '../models/todo'

import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
  SET_VISIBILITY_FILTER,
} from './actions'

export interface AppState {
  todos: Array<Todo>
  visibilityFilter: EnhanceTodoStatus
}

export const initialState: AppState = {
  todos: [],
  visibilityFilter: 'ALL',
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      }

    case CREATE_TODO:
      // Array#push mutates the todos state, hence it's not working properly
      // My solution is simply use ES6 array spread
      const nextTodos = [...state.todos, action.payload]
      return {
        ...state,
        todos: nextTodos,
      }

    case UPDATE_TODO:
      // Array#splice mutates the state
      // My solution is to use Array#map to find and replace the editing todo
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.payload.id ? action.payload : todo
        }),
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        }
      })

      return {
        ...state,
        todos: tempTodos,
      }

    case DELETE_TODO:
      // Array#splice mutates the state, hence deleting item not working properly
      // My solution just simply use Array#filter to create a new reference for todos state
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      }

    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.payload,
      }

    default:
      return state
  }
}

export default reducer
