import { Todo, TodoStatus } from '../models/todo';
import { getTodoIndex } from '../utils/array';
import {
  AppActions,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  GET_TODOS,
  GET_TODOS_SUCCESS,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  isLoading: Boolean;
  todos: Array<Todo>;
}

export const initialState: AppState = {
  isLoading: false,
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: [...action.payload],
        isLoading: false,
      };
    case CREATE_TODO:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        isLoading: false,
      };

    case UPDATE_TODO_STATUS:
      const index = getTodoIndex(state.todos, action.payload.todoId);
      state.todos[index].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: [...state.todos],
      };

    case DELETE_TODO:
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos,
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
