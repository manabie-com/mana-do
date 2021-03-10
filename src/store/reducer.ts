import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  SET_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
} from "./actions";
import {
  deleteAllState,
  deleteSpecificInState,
  loadState,
  saveState,
  toggleAllTodo,
  updateTodo,
  updateTodoStatus,
} from "./localStorage";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

const todoListState = loadState()?.todos;

function reducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      saveState(action.payload);
      state.todos.push(action.payload);
      return {
        ...state,
      };
    case SET_TODO:
      return {
        ...state,
        todos: state.todos,
      };
    case UPDATE_TODO:
      updateTodo(action.payload.todoId, action.payload.content);
      const index3 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index3].content = action.payload.content;
      return {
        ...state,
        todos: state.todos,
      };
    case UPDATE_TODO_STATUS:
      updateTodoStatus(action.payload.todoId, action.payload.checked);
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
      toggleAllTodo(action.payload);
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
      deleteSpecificInState(action.payload);
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(index1, 1);
      return {
        ...state,
        todos: state.todos,
      };
    case DELETE_ALL_TODOS:
      deleteAllState();
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;
