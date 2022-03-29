import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  //**FIXED**
  // In reducer, I think clone to new State -> change new state -> set state === new state is the better way to do.
  // This reducer is double time running so that change initialState directly has created double-time change state bug 
  let newTodos = [...state.todos];
  //**FIXED**
  switch (action.type) {
    case SET_TODO:
      newTodos = action.payload;
      return {
        ...state,
        todos: newTodos,
      };
    case CREATE_TODO:
      newTodos.push(action.payload);
      return {
        ...state,
        todos: newTodos,
      };

    case UPDATE_TODO_CONTENT:
      let index3 = newTodos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      newTodos[index3].content = action.payload.content;
      return {
        ...state,
        todos: newTodos,
      };

    case UPDATE_TODO_STATUS:
      let index2 = newTodos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      newTodos[index2].status = action.payload.checked
        ? TodoStatus.ACTIVE
        : TodoStatus.COMPLETED;
      return {
        ...state,
        todos: newTodos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = newTodos.map((e) => {
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
      let index1 = newTodos.findIndex((todo) => todo.id === action.payload);
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
