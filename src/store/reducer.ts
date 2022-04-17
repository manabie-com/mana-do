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
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    case CREATE_TODO:
      localStorage.setItem(
        "todos",
        JSON.stringify([action.payload, ...state.todos])
      );
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      localStorage.setItem("todos", JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos,
      };

    case UPDATE_TODO_CONTENT:
      const updateContentIdx = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      localStorage.setItem(
        "todos",
        JSON.stringify([
          ...state.todos.slice(0, updateContentIdx),
          { ...state.todos[updateContentIdx], content: action.payload.content },
          ...state.todos.slice(updateContentIdx + 1),
        ])
      );

      return {
        ...state,
        todos: [
          ...state.todos.slice(0, updateContentIdx),
          { ...state.todos[updateContentIdx], content: action.payload.content },
          ...state.todos.slice(updateContentIdx + 1),
        ],
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        if (
          action.payload.status === e.status ||
          action.payload.status === "ALL"
        )
          return {
            ...e,
            status: action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
          };
        else return e;
      });
      localStorage.setItem("todos", JSON.stringify(tempTodos));
      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      localStorage.setItem(
        "todos",
        JSON.stringify([...state.todos.filter((i) => i.id !== action.payload)])
      );

      return {
        ...state,
        todos: [...state.todos.filter((i) => i.id !== action.payload)],
      };
    case DELETE_ALL_TODOS:
      localStorage.removeItem("todos");

      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;
