import { Todo, TodoStatus, EnhanceTodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
  showing: EnhanceTodoStatus;
}

export const initialState: AppState = {
  todos: [],
  showing: "ALL",
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // state.todos.push(action.payload); -> state is readonly, producing new state instead of modify them
      return {...state, todos: [...state.todos, action.payload] };

    case UPDATE_TODO_STATUS: {
      // naming convention: index2 -> todo
      const todo = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[todo].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos,
      };
    }

    case TOGGLE_ALL_TODOS:
      // naming convention: e -> todo
      const tempTodos = state.todos.map((todo) => {
        return {
          ...todo,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      // naming convention: index1 -> todo
      // state.todos.splice(todo, 1); -> state is readonly, producing new state instead of modify them
      const filteredTodos = state.todos.filter((t) => t.id !== action.payload);

      return {
        ...state,
        todos: filteredTodos,
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };

    case FILTER_TODO_STATUS:
      return {
        ...state,
        showing: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
