import { Todo, TodoStatus } from "./models";
import { AppActions } from "./actions";
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from "./constant";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO_STATUS:
      return {
        todos: state.todos.map((item) =>
          item.id === action.payload.todoId
            ? {
                ...item,
                status: action.payload.checked
                  ? TodoStatus.COMPLETED
                  : TodoStatus.ACTIVE,
              }
            : item
        ),
      };
    case UPDATE_TODO_CONTENT:
      return {
        todos: state.todos.map((item) =>
          item.id === action.payload.todoId
            ? {
                ...item,
                content: action.payload.content
              }
            : item
        ),
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
      return {
        todos: state.todos.filter((item) => item.id !== action.payload),
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
