import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      const todos = [...state.todos, action.payload];

      return { ...state, todos };

    case UPDATE_TODO_STATUS:
      const updatedTodos = state.todos.map((el) =>
        el.id === action.payload.todoId
          ? {
              ...el,
              status: action.payload.checked
                ? TodoStatus.COMPLETED
                : TodoStatus.ACTIVE,
            }
          : { ...el }
      );

      return {
        ...state,
        todos: updatedTodos,
      };

    case UPDATE_TODO_CONTENT:
      const updatedContentTodos = state.todos.map((el) =>
        el.id === action.payload.todoId
          ? {
              ...el,
              content: action.payload.content,
            }
          : { ...el }
      );

      return {
        ...state,
        todos: updatedContentTodos,
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
      const filteredTodos = state.todos.filter(
        (el) => el.id !== action.payload
      );

      return {
        ...state,
        todos: filteredTodos,
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
