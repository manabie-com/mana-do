import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
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
    // update state with the new todo added
    case CREATE_TODO:
      if (state.todos.indexOf(action.payload) < 0)
        state.todos.push(action.payload);

      localStorage.setItem("todos", JSON.stringify(state.todos));
      return { ...state };

    // update state with a new todo status
    case UPDATE_TODO_STATUS:
      const todoUpdateStatusIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[todoUpdateStatusIndex].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      localStorage.setItem("todos", JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos,
      };

    // update state with a new todo content
    case UPDATE_TODO_CONTENT:
      const todoUpdateContentIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[todoUpdateContentIndex].content = action.payload.newContent;

      localStorage.setItem("todos", JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos,
      };

    // update state with new todos status
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

    // update state with the selected todo removed
    case DELETE_TODO:
      const removedTodos = state.todos.filter((e) => e.id !== action.payload);

      localStorage.setItem("todos", JSON.stringify(removedTodos));
      return {
        ...state,
        todos: removedTodos,
      };

    // clear all todo in a state
    case DELETE_ALL_TODOS:
      localStorage.setItem("todos", JSON.stringify([]));
      return {
        ...state,
        todos: [],
      };
    default:
      state.todos.push(...action.payload);
      return { ...state };
  }
}

export default reducer;
