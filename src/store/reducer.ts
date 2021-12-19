import { Theme } from "../components/ThemeProvider";
import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  SET_APP_STATE,
  UPDATE_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_THEME,
  UPDATE_SELECTED_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
  theme: Theme;
  status: TodoStatus;
}

export const initialState: AppState = {
  todos: [],
  theme: "darkgreen",
  status: TodoStatus.ALL,
};

function reducer(state: AppState, action: AppActions): AppState {
  // Fix call reducer twice
  // Clone data from old state, because the below logics will change state data.
  const todos = [...state.todos];

  switch (action.type) {
    case CREATE_TODO:
      // Fix call reducer twice
      //state.todos.push(action.payload);
      todos.push(action.payload);
      return {
        ...state,
        todos,
      };

    case UPDATE_TODO_STATUS:
      // Fix call reducer twice
      // const index2 = state.todos.findIndex(
      //   (todo) => todo.id === action.payload.todoId
      // );
      // state.todos[index2].status = action.payload.checked
      //   ? TodoStatus.COMPLETED
      //   : TodoStatus.ACTIVE;
      const index2 = todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos,
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
      // Fix call reducer twice
      // const index1 = state.todos.findIndex(
      //   (todo) => todo.id === action.payload
      // );
      //state.todos.splice(index1, 1);
      const index1 = todos.findIndex((todo) => todo.id === action.payload);
      todos.splice(index1, 1);

      return {
        ...state,
        todos,
      };

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };

    case SET_APP_STATE:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_TODO:
      const index = todos.findIndex((todo) => todo.id === action.payload.id);
      todos[index] = action.payload;

      return {
        ...state,
        todos,
      };

    case UPDATE_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case UPDATE_SELECTED_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
