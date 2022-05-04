import { Todo, TodoStatus } from "../models/todo";
import Service from "../service";
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
  todos: Service.getTodos(),
};

function reducer(state: AppState, action: AppActions): AppState {
  const cloneTodos = [...state.todos];

  switch (action.type) {
    case CREATE_TODO:
      cloneTodos.push(action.payload);
      return {
        ...state,
        todos: cloneTodos,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      cloneTodos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: cloneTodos,
      };
    case UPDATE_TODO_CONTENT:
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      cloneTodos[index].content = action.payload.content;

      return {
        ...state,
        todos: cloneTodos,
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
      cloneTodos.splice(index1, 1);

      return {
        ...state,
        todos: cloneTodos,
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
