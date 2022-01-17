import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}
const todoList = localStorage.getItem("todoList");
export const initialState: AppState = {
  todos: todoList ? JSON.parse(todoList) : [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload,
      };
    }

    case CREATE_TODO: {
      const tempTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: tempTodos,
      };
    }

    case UPDATE_TODO_STATUS: {
      const tempTodos = [...state.todos];
      const index = tempTodos.findIndex((todo) => todo.id === action.payload.todoId);
      tempTodos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: tempTodos,
      };
    }

    case UPDATE_TODO_CONTENT: {
      const tempTodos = [...state.todos];
      const index = tempTodos.findIndex((todo) => todo.id === action.payload.todoId);
      tempTodos[index].content = action.payload.content;

      return {
        ...state,
        todos: tempTodos,
      };
    }

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

    case DELETE_TODO: {
      const tempTodos = [...state.todos];
      const index = tempTodos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index, 1);

      return {
        ...state,
        todos: tempTodos,
      };
    }

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
