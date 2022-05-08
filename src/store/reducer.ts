import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  FILTER_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
  filterState: String;
}

export const initialState: AppState = {
  todos: [],
  filterState: TodoStatus.ALL,
};

function todoReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case UPDATE_TODO_STATUS:
      const { todoId, checked } = action.payload;
      const todoUpdate = [...state.todos].reduce(
        (arr: Array<Todo>, item: any) => {
          if (item.id === todoId && checked) {
            item.status = TodoStatus.COMPLETED;
          }
          if (item.id === todoId && !checked) {
            item.status = TodoStatus.ACTIVE;
          }
          arr.push(item);

          return arr;
        },
        []
      );

      return {
        ...state,
        todos: [...todoUpdate],
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

    case FILTER_TODO:
      return {
        ...state,
        filterState:
          action.payload === TodoStatus.CLEAR_ALL
            ? TodoStatus.ALL
            : action.payload,
      };

    case DELETE_TODO:
      const result = [...state.todos].filter(
        (todo: any) => todo.id !== action.payload
      );

      return {
        ...state,
        todos: result,
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

export default todoReducer;
