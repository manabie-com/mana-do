import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

// Centralize the logic of find the require todo to modify
function findTodoIndex(id: string, todos: Array<Todo>) {
  return todos.findIndex((todo) => todo.id === id);
}

// Make the reducer pure so result remain correct event getting
// fired twice in development mode
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO: {
      const index = findTodoIndex(action.payload.id, state.todos);
      if (index > -1) {
        state.todos.splice(index, 1, action.payload);
      }

      return {
        ...state,
        todos: state.todos,
      };
    }

    case UPDATE_TODO_STATUS: {
      const index = findTodoIndex(action.payload.todoId, state.todos);
      state.todos[index].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos,
      };
    }

    case TOGGLE_ALL_TODOS:
      return {
        ...state,
        todos: state.todos.map((t) => ({
          ...t,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        })),
      };

    case DELETE_TODO:
      const index = findTodoIndex(action.payload, state.todos);
      if (index > -1) {
        state.todos.splice(index, 1);
      }

      return {
        ...state,
        todos: state.todos,
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}

export default reducer;
