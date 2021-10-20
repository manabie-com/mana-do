import { useReducer } from "react";
import { Constants } from "../constants";
import { EnhanceTodoStatus, Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_SHOWING,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
  showing: EnhanceTodoStatus;
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem(Constants.TODOS) || "null") || [],
  showing: Constants.ALL,
};

function reducer(state: AppState, action: AppActions): AppState {
  // we shouldn't change the state directly
  switch (action.type) {
    case CREATE_TODO:
      // state.todos.push(action.payload);
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      // const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      // state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.todoId) {
            return todo;
          }
          return {
            ...todo,
            status: action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
          };
        }),
      };

    case TOGGLE_ALL_TODOS:
      // const tempTodos = state.todos.map((e)=>{
      //   return {
      //     ...e,
      //     status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
      //   }
      // })

      return {
        ...state,
        todos: state.todos.map((todo) => {
          return {
            ...todo,
            status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          };
        }),
      };

    case DELETE_TODO:
      // const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    case UPDATE_TODO_CONTENT:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.todoId) {
            return todo;
          }
          return {
            ...todo,
            content: action.payload.content,
          };
        }),
      };
    case SET_SHOWING:
      return {
        ...state,
        showing: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;

export const useTodoReducer = () => useReducer(reducer, initialState);
