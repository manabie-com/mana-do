import shortid from "shortid";

import { Todo, TodoStatus } from "types";
import { UserName } from "./const";

export type Actions =
  | { type: "CREATE_TODO"; payload: string }
  | { type: "ADD_TODO"; payload: string }
  | { type: "UPDATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "CLEAR_TODOS" }
  | { type: "TOGGLE_ALL_TODOS" }
  | { type: "CHANGE_FILTER"; payload: TodoStatus };

export interface AppState {
  todos: Array<Todo>;
  filter: TodoStatus;
}

export const initialState: AppState = {
  todos: [],
  filter: TodoStatus.ALL,
};

function reducer(state: AppState, action: Actions): AppState {
  switch (action.type) {
    case "CREATE_TODO": {
      const newTodo = {
        id: shortid(),
        content: action?.payload,
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        user_id: UserName,
      };
      return {
        ...state,
        todos: [newTodo, ...state.todos],
      };
    }

    case "UPDATE_TODO": {
      const newTodos = state.todos.map((todoItem) =>
        todoItem.id === action.payload.id
          ? { ...todoItem, ...action.payload }
          : todoItem
      );
      return {
        ...state,
        todos: newTodos,
      };
    }

    case "DELETE_TODO": {
      const newTodos = state.todos.filter((item) => item.id !== action.payload);
      return {
        ...state,
        todos: newTodos,
      };
    }

    case "CLEAR_TODOS":
      return {
        ...state,
        todos: [],
      };

    case "CHANGE_FILTER": {
      return {
        ...state,
        filter: action.payload,
      };
    }

    default:
      return state;
  }
}

export default reducer;
