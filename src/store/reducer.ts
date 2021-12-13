import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
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
      state.todos = [...action.payload];
      break;
    case CREATE_TODO:
      ///Check id item didn't exist in list -> add item
      if (!state.todos.some((e) => e.id === action.payload?.id))
        state.todos.push(action.payload);
      break;
    case UPDATE_TODO_STATUS:
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId)
          return { ...todo, ...action.payload.data };
        return todo;
      });

      break;
    case TOGGLE_ALL_TODOS:
      state.todos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      break;
    case DELETE_TODO:
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      //if id item existed -> delete item
      index1 > -1 && state.todos.splice(index1, 1);
      break;
    case DELETE_ALL_TODOS:
      state.todos = [];
      break;
    default:
      break;
  }
  localStorage.setItem("TodoList", JSON.stringify(state.todos));
  return {
    ...state,
    todos: state.todos,
  };
}

export default reducer;
