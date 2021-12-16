import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
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
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload
      };
    }
    case CREATE_TODO: {
      const prevTodos = [...state.todos]
      prevTodos.push(action.payload)
      return {
        ...state,
        todos: prevTodos
      };
    }
    case UPDATE_TODO_STATUS: {
      const prevTodos = [...state.todos]
      const index = prevTodos.findIndex((todo) => todo.id === action.payload.todoId);
      prevTodos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: prevTodos
      }
    }
    case UPDATE_TODO_CONTENT: {
      const prevTodos = [...state.todos]
      const index = prevTodos.findIndex((todo) => todo.id === action.payload.todoId);
      prevTodos[index].content = action.payload.content
      return {
        ...state,
        todos: prevTodos
      }
    }
    case TOGGLE_ALL_TODOS: {
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }
    }
    case DELETE_TODO: {
      const prevTodos = [...state.todos]
      const index = prevTodos.findIndex((todo) => todo.id === action.payload);
      prevTodos.splice(index, 1);
      return {
        ...state,
        todos: prevTodos
      }
    }
    case DELETE_ALL_TODOS: {
      return {
        ...state,
        todos: []
      }
    } 
    default:
      return state;
  }
}

export default reducer;