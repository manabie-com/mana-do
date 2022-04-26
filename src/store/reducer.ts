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
  todos: [
    // {
    //   content: "Example data",
    //   created_date: "2022-04-22T15:34:11.462Z",
    //   id: "Kj4uRj_Q-",
    //   status: "ACTIVE",
    //   user_id: "firstUser",
    // },
  ],
};

function reducer(state: AppState, action: AppActions): AppState {
  console.log("reducer running reducer", action);
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case EDIT_TODO:
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          return { ...todo, content: action.payload.content };
        }
        return todo;
      });
      return {
        ...state,
        todos: newTodos,
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
      return {
        ...state, //copying the original state
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
