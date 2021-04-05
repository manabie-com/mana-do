import { Todo } from 'src/models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }

    case CREATE_TODO:
      const todosCreate = [...state.todos, action.payload];
      return {
        ...state,
        todos: todosCreate
      };

    case UPDATE_TODO:
      const indexUpdate = state.todos.findIndex((todo) => todo.id === action.payload.todo.id);
      const todosUpdate = [...state.todos];

      todosUpdate[indexUpdate] = {
        ...action.payload.todo
      };

      return {
        ...state,
        todos: todosUpdate
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const indexDel = state.todos.findIndex((todo) => todo.id === action.payload);
      const todoDelete = [...state.todos]

      todoDelete.splice(indexDel, 1);

      return {
        ...state,
        todos: todoDelete
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;