import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO,
} from "./actions";
import produce from "immer";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state = initialState, action: AppActions) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CREATE_TODO:
        draft.todos.push(action.payload);
        break;
      case SET_TODO:
        draft.todos = action.payload;
        break;
      case UPDATE_TODO_STATUS:
        draft.todos = draft.todos.map((todo) => {
          if (todo.id === action.payload.todoId)
            todo.status = action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE;
          return todo;
        });
        break;
      case TOGGLE_ALL_TODOS:
        draft.todos = draft.todos.map((e) => {
          return {
            ...e,
            status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          };
        });

        break;
      case DELETE_TODO:
        draft.todos = draft.todos.filter((todo) => todo.id !== action.payload);
        break;
      case DELETE_ALL_TODOS:
        draft.todos = [];
        break;
      case UPDATE_TODO:
        draft.todos = draft.todos.map((todo) => {
          if (todo.id === action.payload.id)
            todo.content = action.payload.content;
          return todo;
        });
        break;
    }
  });
}

export default reducer;
