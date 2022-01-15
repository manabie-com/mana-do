import {Todo, TodoStatus} from '../models/todo';
import { AppActions } from './actions';
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './action-types';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action?.type) {
    case CREATE_TODO: {
      const tempTodos = [
        ...state.todos, 
        action.payload
      ];
      return {
        ...state,
        todos: tempTodos
      };
    }

    case UPDATE_TODO_STATUS: {
      const { todoId, checked } = action.payload;
      const tempTodos = state.todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
          }
        } 
        return todo
      });

      return {
        ...state,
        todos: tempTodos
      }
    }

    case TOGGLE_ALL_TODOS: {
      const tempTodos = state.todos.map((e)=>{
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
      const tempTodos = [...state.todos];
      const index = tempTodos.findIndex((todo) => todo.id === action.payload);
      tempTodos.splice(index, 1);

      return {
        ...state,
        todos: tempTodos
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