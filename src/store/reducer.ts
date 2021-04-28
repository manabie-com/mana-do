import {Todo, TodoStatus} from '../models/todo';
import { clearTodos } from '../utils/helpers';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_ITEM,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

// Explain what i did
// I set todos in localStorage to prevent reload page, it will make the data disappear
// I don't want use any package to persist the data
// That the reason i use state.todos to get the current data instead state.todos

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      const newTodos = [...state.todos];
      newTodos.push(action.payload);

      return {
        ...state,
        todos: newTodos,
      };
    }

    case SET_TODO: {
      return {
        ...state,
        todos: action.payload,
      }
    }

    case UPDATE_TODO_STATUS: {
      const { todoId = '', checked = false } = action.payload;
      const newTodos = [...state.todos].map(item => {
        if (item.id === todoId) {
          return {
            ...item,
            status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          }
        }

        return item;
      })

      return {
        ...state,
        todos: newTodos,
      }
    }

    case TOGGLE_ALL_TODOS: {
      const newTodos = [...state.todos].map(item => {
        return {
          ...item,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      
      return {
        ...state,
        todos: newTodos,
      }
    }

    case DELETE_TODO: {
      const newTodos = [...state.todos].filter(item => item.id !== action.payload);

      return {
        ...state,
        todos: newTodos,
      }
    }

    case UPDATE_TODO_ITEM: {
      const { todoId, value } = action.payload;
      const newTodos = [...state.todos].map(item => {
        if (item.id === todoId) {
          return {
            ...item,
            content: value,
          }
        }

        return item;
      })

      return {
        ...state,
        todos: newTodos,
      }
    }

    case DELETE_ALL_TODOS: {
      clearTodos();

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