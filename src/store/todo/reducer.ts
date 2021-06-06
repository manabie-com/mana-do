import { IToDoState, TodoStatus } from 'models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  SET_SHOWING_TAB,
} from './actions';

export const initialState: IToDoState = {
  showing: 'ALL',
  todos: [],
};

function reducer(state: IToDoState, action: AppActions): IToDoState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case UPDATE_TODO_STATUS:
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
      const newTodos = state.todos.filter((item) => item.id !== action.payload);

      return {
        ...state,
        todos: newTodos,
      };

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };

    case SET_SHOWING_TAB:
      return {
        ...state,
        showing: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
