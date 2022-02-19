import { Todo, TodoStatus } from "../models/todo";
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
  todos: [],
};

//persistent - save state
const saveState = (state: AppState) => {
  localStorage.setItem("todoState", JSON.stringify(state));
};

function reducer(state: AppState, action: AppActions): AppState {
  let _todos = [...state.todos];
  switch (action.type) {
    case CREATE_TODO:
      _todos.push(action.payload);
      saveState({
        ...state,
        todos: _todos,
      });
      return {
        ...state,
        todos: _todos,
      };

    case UPDATE_TODO_STATUS:
      const index2 = _todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      _todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      saveState({
        ...state,
        todos: _todos,
      });
      return {
        ...state,
        todos: _todos,
      };

    case UPDATE_TODO_CONTENT:
      const index3 = _todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      _todos[index3].content = action.payload.content;
      saveState({
        ...state,
        todos: _todos,
      });
      return {
        ...state,
        todos: _todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = _todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      saveState({
        ...state,
        todos: tempTodos,
      });
      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      const index1 = _todos.findIndex((todo) => todo.id === action.payload);
      _todos.splice(index1, 1);
      saveState({
        ...state,
        todos: _todos,
      });
      return {
        ...state,
        todos: _todos,
      };
    case DELETE_ALL_TODOS:
      saveState({
        ...state,
        todos: [],
      });
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;
