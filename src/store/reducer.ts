import { Todo, TodoStatus } from "models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO,
} from "./actions";

export interface AppState {
  todos: Todo[];
}

export const initialState: AppState = {
  todos: [],
};

function todoReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      return {
        ...state,
        todos: Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload],
      };
    }

    case CREATE_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    case UPDATE_TODO_STATUS: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.status = action.payload.checked
            ? TodoStatus.COMPLETED
            : TodoStatus.ACTIVE;
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case TOGGLE_ALL_TODOS: {
      const updatedTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload.checked
            ? TodoStatus.COMPLETED
            : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case DELETE_TODO: {
      const remainingTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return {
        ...state,
        todos: remainingTodos,
      };
    }

    case DELETE_ALL_TODOS: {
      return {
        ...state,
        todos: [],
      };
    }

    case UPDATE_TODO: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.content = action.payload.content;
        }
        return todo;
      });

      return {
        ...state,
        todos: [...updatedTodos],
      };
    }

    default:
      return state;
  }
}

export default todoReducer;
