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
        todos: [action.payload, ...state.todos]
      }

    // When I add React.memo in TodoItem, I notice that it has a problem with shallow copy in nested object.
    // Then my solution in the easiest way is use map in order to keep state immutable.
    case UPDATE_TODO_STATUS:
      const updateStatus = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                status: updateStatus
              }
            : todo
        )
      }

    case UPDATE_TODO_CONTENT:
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? {
              ...todo,
              content: action.payload.content
            }
          : todo
      )
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
