import { setToStorage } from "./../utils/storage";
import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // Updated: I change push to unshift in order to make latest todo stack in top of list
      state.todos.unshift(action.payload);
      setToStorage(state.todos);
      return {
        ...state,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      setToStorage(state.todos);
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

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(index1, 1);
      setToStorage(state.todos);
      return {
        ...state,
        todos: state.todos,
      };
    case DELETE_ALL_TODOS:
      setToStorage([]);
      return {
        ...state,
        todos: [],
      };

    // Updated: handle case SET_TODO
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case UPDATE_TODO_CONTENT:
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index].content = action.payload.content;

      setToStorage(state.todos);
      return {
        ...state,
        todos: state.todos,
      };
    default:
      return state;
  }
}

export default reducer;
