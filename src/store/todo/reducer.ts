import { ITodo, ETodoStatus } from '../../types/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
  SET_TODO
} from './actions';

export interface AppState {
  todos: ITodo[]
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      return { ...state, todos: action.payload };
    }
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case UPDATE_TODO_STATUS: {
      const { todoId, checked } = action.payload;
      const updatedIndex = state.todos.findIndex((todo) => todo.id === todoId);
      const updatedTodo = { ...state.todos[updatedIndex], status: checked ? ETodoStatus.COMPLETED : ETodoStatus.ACTIVE }
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, updatedIndex), updatedTodo, ...state.todos.slice(updatedIndex + 1)
        ]
      }
    }
    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? ETodoStatus.COMPLETED : ETodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const deletedIndex = state.todos.findIndex((todo) => todo.id === action.payload);
      const remainTodos = [...state.todos.slice(0, deletedIndex), ...state.todos.slice(deletedIndex + 1)];
      return {
        ...state,
        todos: remainTodos
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case UPDATE_TODO: {
      const updatedIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const updatedTodos = [...state.todos.slice(0, updatedIndex), action.payload.updatedTodo, ...state.todos.slice(updatedIndex + 1)]
      return {
        ...state,
        todos: updatedTodos
      }
    }
    default:
      return state;
  }
}

export default reducer;