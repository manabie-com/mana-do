/* eslint-disable no-redeclare */
import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
  SET_TODO,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
  isLogged: boolean;
}

export const initialState: AppState = {
  todos: [],
  isLogged: false,
};

function storeTodoList(data: Array<Todo>) {
  window.localStorage.setItem("mana-todo-list", JSON.stringify(data));
}

function reducer(state: AppState, action: AppActions): AppState {
  const todos = [...state.todos];

  switch (action.type) {
    case CREATE_TODO:
      const newTodos = todos.concat(action.payload);

      storeTodoList(newTodos);

      return {
        ...state,
        todos: newTodos,
      };

    case UPDATE_TODO_STATUS:
      const index2 = todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      storeTodoList(todos);

      return {
        ...state,
        todos: todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      storeTodoList(tempTodos);

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      const index1 = todos.findIndex((todo) => todo.id === action.payload);
      todos.splice(index1, 1);

      storeTodoList(todos);

      return {
        ...state,
        todos: todos,
      };
    case DELETE_ALL_TODOS:
      storeTodoList([]);

      return {
        ...state,
        todos: [],
      };

    case UPDATE_TODO:
      const index = todos.findIndex((todo) => todo.id === action.payload.id);

      todos[index] = {
        ...action.payload,
      };

      storeTodoList(todos);

      return {
        ...state,
        todos: todos,
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
