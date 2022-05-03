import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO
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
      const not_duplicate = state.todos.every((value: Record<string, any>) => value?.id !== action.payload.id)
      if (not_duplicate) {
        state.todos.push(action.payload)
      }
      const todos_stringify = JSON.stringify(state.todos) // ** Convert JSON to stringify so that it can sve in the local storage
      localStorage.setItem('todos', todos_stringify)
      return {
        ...state
      };

    case SET_TODO:
      // ** For set Todo from local storage
      if (!action.payload) {
        return {
          ...state,
          todos: []
        }
      }

      return {
        ...state,
        todos: action.payload
      }


    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
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

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      localStorage.removeItem('todos')  // ** To remove storage item by adding key 
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;