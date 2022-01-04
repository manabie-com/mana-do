import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

/*
 *  when working with redux, we need to avoid modify the state directly, because the redux state is immutable.
 * Redux has a mechanism which employ the shallow equality checking by comparing the previous state with the updated state.
 * If the state was mutable, the result of the that equation always return true which mean it leads to the wrong result.
 * */
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      const newStatus = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);

      return {
        ...state,
        todos: state.todos.map((todo, i) => (i === index2 ? { ...todo, status: newStatus } : todo)),
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);

      return {
        ...state,
        todos: filteredTodos,
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case UPDATE_TODO_CONTENT:
      const updatedIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);

      return {
        ...state,
        todos: state.todos.map((todo, i) => (i === updatedIndex ? { ...todo, content: action.payload.content } : todo)),
      };
    default:
      return state;
  }
}

export default reducer;
