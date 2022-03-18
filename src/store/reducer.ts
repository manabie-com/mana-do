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

import { addTodoList, removeTodoList } from "../utils/handleTodo";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // wrong: duplicate todo when add todo

      // Add Todo into localStorage
      addTodoList([...state.todos, action.payload]);
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      const todoListForUpdateStatus = [...state.todos];
      const index2 = todoListForUpdateStatus.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      todoListForUpdateStatus[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      // Add Todo into localStorage
      addTodoList(todoListForUpdateStatus);
      return {
        ...state,
        todos: todoListForUpdateStatus,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      addTodoList(tempTodos);
      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      const tempTodoDelete = [...state.todos];
      const todoDeleteIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(todoDeleteIndex, 1);
      addTodoList(tempTodoDelete);
      return {
        ...state,
        todos: tempTodoDelete,
      };

    case DELETE_ALL_TODOS:
      removeTodoList();
      return {
        ...state,
        todos: [],
      };

    // add action SET_TODO to add todo into the store
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case UPDATE_TODO:
      const todoListForUpdate = [...state.todos];
      const index3 = todoListForUpdate.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      todoListForUpdate[index3].content = action.payload.content;
      // Add Todo into localStorage
      addTodoList(todoListForUpdate);
      return {
        ...state,
        todos: todoListForUpdate,
      };
    default:
      return state;
  }
}

export default reducer;
