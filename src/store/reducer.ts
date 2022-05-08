import { Todo } from "models";
import { TodoStatus } from "../models";
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from "./action-types";
import { AppActions } from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case UPDATE_TODO_STATUS: {
      const { todoId, status } = action.payload;
      const tmpTodos = state.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            status,
          };
        }
        return todo;
      });

      return {
        ...state,
        todos: tmpTodos,
      };
    }
    case TOGGLE_ALL_TODOS: {
      const tmpTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: tmpTodos,
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    }
    case DELETE_ALL_TODOS: {
      return {
        ...state,
        todos: [],
      };
    }
    case UPDATE_TODO_CONTENT: {
      const { todoId, content } = action.payload;

      const tmpTodos = state.todos.map((item) => {
        if (item.id === todoId) {
          return {
            ...item,
            content,
          };
        }
        return item;
      });

      return {
        ...state,
        todos: tmpTodos,
      };
    }
    default:
      return state;
  }
}

export default reducer;
