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

//persistent - save state
const saveState = (state: AppState) => {
  localStorage.setItem("todoState", JSON.stringify(state));
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      saveState(state);
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
      saveState(state);
      return {
        ...state,
        todos: state.todos,
      };

    case UPDATE_TODO_CONTENT:
      const index3 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index3].content = action.payload.content
      saveState(state);
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
      saveState({
        ...state,
        todos: tempTodos,
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
      saveState(state);
      return {
        ...state,
        todos: state.todos,
      };
    case DELETE_ALL_TODOS:
      saveState({
        ...state,
        todos: [],
      });
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;
