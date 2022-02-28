import { Todo, TodoStatus } from '../models/todo'
import { AppActions } from './actions'
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS
} from './constant'

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload
      }
    }

    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }

    case UPDATE_TODO_STATUS:
      const todoIndex1 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      )
      const todos1 = [...state.todos]
      if (todoIndex1 >= 0) {
        todos1[todoIndex1].status = action.payload.checked
          ? TodoStatus.COMPLETED
          : TodoStatus.ACTIVE
      }
      return {
        ...state,
        todos: todos1
      }

    case UPDATE_TODO_CONTENT:
      const todoIndex2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      )
      const todos2 = [...state.todos]
      if (todoIndex2 >= 0) {
        todos2[todoIndex2].content = action.payload.content
      }
      return {
        ...state,
        todos: todos2
      }

    case TOGGLE_ALL_TODOS:
      return {
        ...state,
        todos: state.todos.map((e) => {
          return {
            ...e,
            status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
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
      return state
  }
}

export default reducer

// To work with state, it's better to deep copy new state and work on this.
