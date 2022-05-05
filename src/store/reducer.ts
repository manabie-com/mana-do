import KeyStorages from '../constants/key-storages';
import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_NAME,
  UPDATE_TODO_STATUS
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
      state.todos.push(action.payload);

      localStorage.setItem(KeyStorages.LIST_TODO, JSON.stringify(state.todos));

      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if (state.todos[index2])
        state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      localStorage.setItem(KeyStorages.LIST_TODO, JSON.stringify(state.todos));

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

      localStorage.setItem(KeyStorages.LIST_TODO, JSON.stringify(tempTodos));

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);

      if (index1 !== -1)
        state.todos.splice(index1, 1);

      localStorage.setItem(KeyStorages.LIST_TODO, JSON.stringify(state.todos));

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem(KeyStorages.LIST_TODO, JSON.stringify([]));
      return {
        ...state,
        todos: []
      }

    case SET_TODO:
      localStorage.setItem(KeyStorages.LIST_TODO, JSON.stringify(action.payload));
      return {
        todos: action.payload
      }

    case UPDATE_TODO_NAME:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if (state.todos[index3])
        state.todos[index3].content = action.payload.name;

      localStorage.setItem(KeyStorages.LIST_TODO, JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos
      }

    default:
      return state;
  }
}

export default reducer;