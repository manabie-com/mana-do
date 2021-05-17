/**
 * Current Problems
 *  + Logic:
 *      -  issue_01 : althought dispatch action one time but, reducer being called twice,
 *          Because current `reducer` function is not a pure function, it has side effect like (pushing item to array)
 *          So when specify `React.StricMode` at top of root Component
 *          React will try to involke twice
 */
import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
  toggleAll: boolean;
}

export const initialState: AppState = {
  todos: [],
  toggleAll: false,
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return { ...state, todos: action.payload };
    case CREATE_TODO:
      //// state.todos.push(action.payload);
      // Fix: side-effect
      return {
        ...state,
        todos: [...state.todos, action.payload],
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
    case UPDATE_TODO:
      const editTodoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (editTodoIndex > -1) {
        state.todos[editTodoIndex] = action.payload;
      }

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
        toggleAll: action.payload,
        todos: tempTodos,
      };

    case DELETE_TODO:
      // Fix: side-effect
      //// const index1 = state.todos.findIndex(
      ////   (todo) => todo.id === action.payload
      //// );
      //// state.todos.splice(index1, 1);
      return {
        ...state,
        todos: state.todos.filter((x) => x.id !== action.payload),
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
