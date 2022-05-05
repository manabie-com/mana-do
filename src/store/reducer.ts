import { Todo, TodoStatus } from '../models/todo'
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_DATA,
} from './actions'

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: [],
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      }

    case CREATE_TODO:
      const newTodos = [action.payload, ...state.todos]
      localStorage.setItem('todos', JSON.stringify(newTodos))
      return {
        ...state,
        todos: newTodos,
      }

    case UPDATE_TODO_DATA:
      const { todoId, values }: { todoId: string; values: any } = action.payload
      const findItem: Todo = state.todos.find(e => e.id === todoId) || {}
      Object.keys(values).forEach(e => {
        findItem[e] = values[e]
      })
      localStorage.setItem('todos', JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos,
      }

    case DELETE_ALL_TODOS:
      localStorage.removeItem('todos')
      return {
        ...state,
        todos: [],
      }

    case DELETE_TODO:
      const remainingItems = state.todos.filter(
        e => e.id !== action.payload.idItem
      )
      localStorage.setItem('todos', JSON.stringify(remainingItems))
      return {
        ...state,
        todos: remainingItems,
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map(e => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        }
      })
      localStorage.setItem('todos', JSON.stringify(tempTodos))
      return {
        ...state,
        todos: tempTodos,
      }

    default:
      return state
  }
}

export default reducer
