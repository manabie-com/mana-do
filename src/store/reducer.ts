import { saveStateToLocalStorage } from "src/utils";
import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function cacheState(state: AppState, action: AppActions): AppState {
  const currState = reducer(state, action);
  saveStateToLocalStorage(currState);
  return currState;
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    }

    case UPDATE_TODO_STATUS: {
      const todos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? {
              ...todo,
              status: action.payload.checked
                ? TodoStatus.COMPLETED
                : TodoStatus.ACTIVE,
            }
          : todo
      );
      return {
        ...state,
        todos: todos,
      };
    }

    case UPDATE_TODO: {
      const todos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? {
              ...todo,
              content: action.payload.content,
            }
          : todo
      );
      return {
        ...state,
        todos: todos,
      };
    }

    case DELETE_TODO: {
      const todos = state.todos.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos: todos,
      };
    }

    case DELETE_ALL_TODOS:
      return initialState;

    default:
      return state;
  }
}

export default cacheState;
