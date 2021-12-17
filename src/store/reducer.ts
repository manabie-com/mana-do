import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

// Use localStorage as initialState
export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem("localTodos") as string) || [],
};

function reducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case CREATE_TODO:
      // Create a copy of the existing state and add values
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    // Create UPDATE_TODO
    case UPDATE_TODO:
      const editTodo = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId)
          return {
            ...todo,
            content: action.payload.newTodo,
          };
        return todo;
      });
      return {
        ...state,
        todos: editTodo,
      };

    // Check if todo is checked.
    case UPDATE_TODO_STATUS:
      const updatedTodo = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId)
          return {
            ...todo,
            status: action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
          };
        return todo;
      });
      return {
        ...state,
        todos: updatedTodo,
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

    // Delete todos that match IDs. Use filter instead of spice.
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
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
