import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem("todolist") || "[]"),
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      const todo = action.payload;
      !!todo.content.trim().length && state.todos.push(todo);
      return {
        ...state,
      };
    case EDIT_TODO: {
      state.todos[action.payload.index].content = action.payload.content
      state.todos[action.payload.index].editing = action.payload.status;
      return {
        ...state,
      };
    }
    case UPDATE_TODO_STATUS:
      state.todos[action.payload.todoIndex].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      state.todos.forEach((todo) => {
        todo.status = action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      });
      return {
        ...state,
        todos: state.todos,
      };

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
    default: {
      return {
        ...state,
        todos: state.todos.map((todo) => {return {...todo, editing: false}})
      }
    }
  }
}

export default reducer;
