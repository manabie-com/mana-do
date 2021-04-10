import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  SET_TODO,
  EDIT_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  TOGGLE_POPUP,
} from "./actions";
import { setLocalStore, getLocalStore } from "../utils";
export interface AppState {
  todos: Array<Todo>;
  isToggle: boolean;
}

export const initialState: AppState = {
  todos: [],
  isToggle: false,
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos = [
        ...state.todos.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
      setLocalStore("todoList", [...state.todos]);
      return {
        ...state,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      setLocalStore("todoList", [...state.todos]);

      return {
        ...state,
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
      const id = action.payload;
      state.todos = [...state.todos.filter((item) => item.id !== id)];
      setLocalStore("todoList", [...state.todos]);
      return {
        ...state,
        todos: state.todos,
      };

    case DELETE_ALL_TODOS:
      setLocalStore("todoList", "");
      return {
        ...state,
        todos: [],
      };
    case TOGGLE_POPUP:
      state.isToggle = !state.isToggle;
      return {
        ...state,
        isToggle: state.isToggle,
      };

    case SET_TODO:
      state.todos = [...action.payload];
      setLocalStore("todoList", [...state.todos]);
      return {
        ...state,
      };

    case EDIT_TODO:
      const currentList = JSON.parse(getLocalStore("todoList"));
      const todo = action.payload;
      let newData = currentList.map((item: any) => {
        if (item.id === todo.id)
          return Object.assign({}, item, { content: todo.content });
        return item;
      });
      state.todos = [...newData];
      setLocalStore("todoList", [...newData]);
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default reducer;
