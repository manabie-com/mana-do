import { Todo } from '../models/todo'
import { AppActions } from '../types/actions'
import { AppState } from '../types/AppState'
import { getTodoIndex } from '../utils/getTodoIndex'
import {
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  DELETE_ALL_TODOS,
  DELETE_ALL_TODOS_SUCCESS,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  GET_TODOS,
  GET_TODOS_SUCCESS,
  TOGGLE_ALL_TODOS,
  TOGGLE_ALL_TODOS_SUCCESS,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
} from '../config/constants'

export const initialState: AppState = {
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  todos: [],
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: [...action.payload],
        isLoading: false,
      }
    case CREATE_TODO:
      return {
        ...state,
        isCreating: true,
      }
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        isCreating: false,
      }

    case UPDATE_TODO:
      return {
        ...state,
        isUpdating: true,
      }

    case UPDATE_TODO_SUCCESS:
      const { todoId, status, content } = action.payload
      const updateTodoIndex = getTodoIndex(state.todos, todoId)

      if (status) {
        state.todos[updateTodoIndex].status = status
      }

      if (content) {
        state.todos[updateTodoIndex].content = content
      }

      return {
        ...state,
        todos: [...state.todos],
        isUpdating: false,
      }

    case DELETE_TODO:
      return {
        ...state,
        isUpdating: true,
      }
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        isUpdating: false,
      }

    case TOGGLE_ALL_TODOS:
      return {
        ...state,
        isLoading: true,
      }

    case TOGGLE_ALL_TODOS_SUCCESS:
      const { todoIds } = action.payload
      const tempTodos = state.todos.map((todo: Todo) => {
        if (todoIds.includes(todo.id)) {
          todo.status = action.payload.status
        }
        return todo
      })

      return {
        ...state,
        isLoading: false,
        todos: tempTodos,
      }

    case DELETE_ALL_TODOS:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_ALL_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: [],
      }
    default:
      return state
  }
}

export default reducer
