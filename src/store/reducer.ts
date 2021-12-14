import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODOS,
  SET_TODO,
  TOGGLE_ALL_TODOS,
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
    /** Storage Todos */
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    case CREATE_TODO:
      /** Immutable State */
      // state.todos.push(action.payload);
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      // const index2 = state.todos.findIndex(
      //   (todo) => todo.id === action.payload.todoId
      // );
      /** Use Map Method to prevent Immutable State */
      const updateNewStatusTodos = state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          return {
            ...item,
            status: action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
          };
        }
        return item;
      });
      return {
        ...state,
        // todos: state.todos
        todos: updateNewStatusTodos,
      };

    case TOGGLE_ALL_TODOS:
      //I don't know the reason why we passed e props
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
      /** Use filter instead of findIndex and splice (create New Array to return)*/
      const newTodos = state.todos.filter((item) => item.id !== action.payload);

      return {
        ...state,
        // todos: state.todos
        todos: newTodos,
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    /** Edit */
    case EDIT_TODOS:
      const edit = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            content: action.payload.content,
          };
        }
        return item;
      });
      return {
        ...state,
        todos: edit,
      };
    default:
      return state;
  }
}

export default reducer;
