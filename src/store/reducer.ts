import { ITodo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
  SET_TODO,
} from "./actions";

export interface AppState {
  todos: Array<ITodo>;
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
      const newTodos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? {
              ...todo,
              status: action.payload.checked
                ? TodoStatus.COMPLETED
                : TodoStatus.ACTIVE,
            }
          : todo
      ) as unknown as ITodo[];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return {
        ...state,
        todos: newTodos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
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
      localStorage.setItem("todos", JSON.stringify([]));
      return {
        ...state,
        todos: [],
      };

    case UPDATE_TODO_CONTENT:
      const newTodos2 = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, content: action.payload.content }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos2));
      return {
        ...state,
        todos: newTodos2,
      };

    default:
      return state;
  }
}

export default reducer;
