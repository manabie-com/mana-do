import {Todo, TodoStatus} from '../models/todo';
import { saveTodos, removeAllTodos } from '../utils';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      const tempTodos1 = [...state.todos, action.payload];
      saveTodos(tempTodos1);
      return {
        ...state,
        todos: tempTodos1,
      };

    case UPDATE_TODO_STATUS:
      const tempTodos2 = state.todos.map((todo) => {
        if(todo.id === action.payload.todoId) {
          return {
            ...todo,
            status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          }
        }
        return todo;
      })
      saveTodos(tempTodos2);
      return {
        ...state,
        todos: tempTodos2
      }

      case UPDATE_TODO_CONTENT:
        const tempTodos3 = state.todos.map((todo) => {
          if(todo.id === action.payload.todoId) {
            return {
              ...todo,
              content: action.payload.content,
            }
          }
          return todo;
        })
        saveTodos(tempTodos3);
        return {
          ...state,
          todos: tempTodos3
        }

    case TOGGLE_ALL_TODOS:
      const tempTodos4 = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      saveTodos(tempTodos4);
      return {
        ...state,
        todos: tempTodos4
      }

    case DELETE_TODO:
      const remainingTodos = [...state.todos].filter((todo) => todo.id !== action.payload);
      saveTodos(remainingTodos);
      return {
        ...state,
        todos: remainingTodos
      }
    case DELETE_ALL_TODOS:
      removeAllTodos();
      return {
        ...state,
        todos: []
      }
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;
