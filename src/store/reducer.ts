import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
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
    // push to todos array cause state mutation which is not good and anti-patterm
    // we should create a copy of the previous state with updated new todo task instead
    // the original code create 2 identical task when we confirm the new task with "enter"
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    // find and make a copy of updated element status, then return new state with new element replaced only
    //
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      const todoCopy = { ...state.todos[index2] };
      todoCopy.status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index2),
          todoCopy,
          ...state.todos.slice(index2 + 1),
        ],
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

    // Delete todo also has anti-patterm of mutating state directly
    // modifed to return a new copy of the state of which is the combination of [0, removedTodo] + [the-right-of-removedTodo, end]
    case DELETE_TODO:
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index1),
          ...state.todos.slice(index1 + 1),
        ],
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
