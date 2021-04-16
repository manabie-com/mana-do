import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: localStorage.getItem('todos') !== null ? JSON.parse(localStorage.getItem('todos') || '{""}'): [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      console.log("whyyy call 2 turns");
      state.todos.push(action.payload);
      console.log("current state ", state.todos);
      localStorage.setItem('todos',JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos,
      };

    case UPDATE_TODO_CONTENT:
      console.log(action.payload);
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index].content = action.payload.content;
      localStorage.setItem('todos',JSON.stringify(state.todos));
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
        localStorage.setItem('todos',JSON.stringify(state.todos));
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
      localStorage.setItem('todos',JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos,
      };
    case DELETE_ALL_TODOS:
      localStorage.removeItem('todos');
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}

export default reducer;
