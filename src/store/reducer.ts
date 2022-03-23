import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  TOGGLE_MULTI_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos:
    window.localStorage.getItem("todos") !== null
      ? JSON.parse(window.localStorage.getItem("todos") || "")
      : [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      const tempTodoStatus = [...state.todos];
      const index2 = tempTodoStatus.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      tempTodoStatus[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: tempTodoStatus,
      };

    case UPDATE_TODO_CONTENT:
      const tempTodoContent = [...state.todos];
      const index = tempTodoContent.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      tempTodoContent[index].content = action.payload.content;

      return {
        ...state,
        todos: tempTodoContent,
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

    case TOGGLE_MULTI_TODOS:
      const tempList = state.todos.map((todo) => {
        if (action.payload.ids.includes(todo.id)) {
          return {
            ...todo,
            status: action.payload.status,
          };
        } else {
          return { ...todo };
        }
      });

      return {
        ...state,
        todos: tempList,
      };

    case DELETE_TODO:
      const newTodos = [...state.todos];
      const index1 = newTodos.findIndex((todo) => todo.id === action.payload);

      newTodos.splice(index1, 1);

      return {
        ...state,
        todos: newTodos,
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
