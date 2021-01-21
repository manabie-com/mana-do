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

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: [...action.payload],
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo: Todo) => {
          if (todo.id === action.payload.todoId) {
            return Object.assign({}, todo, {
              status: action.payload.checked
                ? TodoStatus.COMPLETED
                : TodoStatus.ACTIVE,
            });
          }
          return todo;
        }),
      };
    case UPDATE_TODO_CONTENT:
      return {
        ...state,
        todos: state.todos.map((todo: Todo) => {
          if (todo.id === action.payload.todoId) {
            return Object.assign({}, todo, {
              content: action.payload.content,
            });
          }
          return todo;
        }),
      };
    case TOGGLE_ALL_TODOS:
      return {
        ...state,
        todos: state.todos.map((todo: Todo) => {
          return Object.assign({}, todo, {
            status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          });
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => {
          return todo.id !== action.payload;
        }),
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
