import { TodoStatus } from "../constants/todo";
import Todo from "../models/todo";

import {
  CREATE_TODO,
  DELETE_ALL_TODO_LIST,
  DELETE_TODO,
  TOGGLE_ALL_TODO,
  UPDATE_TODO, 
  SET_TODO_LIST,
} from "../constants/todoAction";
import { AppActions } from "./actions";

export interface AppState {
  todoList: Array<Todo>;
}

export const initialState: AppState = {
  todoList: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO_LIST:
      return { ...state, todoList: action.payload };
    case CREATE_TODO:
      const newTodoList = [...state.todoList];
      newTodoList.push(action.payload);

      return {
        ...state,
        todoList: newTodoList,
      };

    case TOGGLE_ALL_TODO:
      const todoListUpdated = state.todoList.map(
        (todo) =>
          new Todo(
            todo.id,
            todo.user_id,
            todo.content,
            todo.created_date,
            action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
          )
      );

      return {
        ...state,
        todoList: todoListUpdated,
      };

    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.payload),
      };
    case DELETE_ALL_TODO_LIST:
      return {
        ...state,
        todoList: [],
      };
    case UPDATE_TODO:
      const todoUpdate = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

      return {
        ...state,
        todoList: todoUpdate,
      };
    default:
      return state;
  }
}

export default reducer;
