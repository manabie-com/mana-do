import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
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
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case CREATE_TODO:
      // state.todos.push(action.payload);
      // because reducer has been called twice, we use arr.push will make array have double value
      const todos = state.todos.concat(action.payload);
      localStorage.setItem("todos", JSON.stringify(todos));
      return {
        ...state,
        todos,
      };

    case UPDATE_TODO:
      const index3 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index3].content = action.payload.content;
      localStorage.setItem("todos", JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

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
      if (index1 !== -1) {
        //check element exists in the array will remove it out of the array
        state.todos.splice(index1, 1);
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));

      return {
        ...state,
        todos: state.todos,
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
