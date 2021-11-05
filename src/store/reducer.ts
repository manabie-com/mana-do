import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  EDIT_TODO
} from './actions';
import { TODOS } from '../constants'
export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function setLocalTodo(data: Array<Todo>) {
  localStorage.setItem(TODOS, JSON.stringify(data))
}

function reducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }

    case CREATE_TODO: {
      const newTodos = [...state.todos, action.payload];
      setLocalTodo(newTodos)
      return { ...state, todos: newTodos }
    }

    case EDIT_TODO: {
      const newTodos = [...state.todos]
      newTodos.forEach((item: { id: string; content: string; }) => {
        if (item.id === action.payload.todoId) {
          item.content = action.payload.content
        }
      })
      setLocalTodo(newTodos)
      return { ...state, todos: newTodos }
    }

    case UPDATE_TODO_STATUS: {
      const newTodos = [...state.todos]
      newTodos.forEach(item => {
        if (item.id === action.payload.todoId) {
          item.status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        }
      })
      setLocalTodo(newTodos)
      return {
        ...state,
        todos: newTodos
      }
    }

    case TOGGLE_ALL_TODOS: {
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      setLocalTodo(tempTodos)
      return {
        ...state,
        todos: tempTodos
      }
    }

    case DELETE_TODO: {
      let newTodos = state.todos.filter(item => item.id !== action.payload)
      setLocalTodo(newTodos)
      return {
        ...state,
        todos: newTodos
      }
    }

    case DELETE_ALL_TODOS:
      localStorage.removeItem(TODOS)
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;