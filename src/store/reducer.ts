import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "./actions";

import { STORAGE_TODO } from "./../models/todo";
import { Todo, TodoStatus } from "../models/todo";

import { clearLocalStorage, setLocalStorage } from "../utils/helpers";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      const todos = [action.payload, ...state.todos];
      setLocalStorage(todos);

      return {
        ...state,
        todos,
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      setLocalStorage(state.todos);

      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      setLocalStorage(tempTodos);

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(index1, 1);
      setLocalStorage(state.todos);

      return {
        ...state,
        todos: state.todos,
      };

    case DELETE_ALL_TODOS:
      clearLocalStorage(STORAGE_TODO);

      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}

export default reducer;
