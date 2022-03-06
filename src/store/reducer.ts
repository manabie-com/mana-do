import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      // create a copy of data before adding a new todo item
      const todos = state.todos.slice();
      todos.push(action.payload);

      return {
        ...state,
        todos
      };
    }

    case GET_TODOS: {
      const todos = action.payload;

      return {
        ...state,
        todos
      };
    }

    case UPDATE_TODO_STATUS: {
      // create a copy of data before updating a todo item
      const todos = state.todos.slice();
      const index = todos.findIndex((todo) => todo.id === action.payload.todoId);
      todos.splice(index, 1, action.payload.updatedTodo);

      return {
        ...state,
        todos
      };
    }

    case DELETE_TODO: {
      // data deletion is not a good practice esp in prod env
      // filter data by status instead
      const todos = state.todos.slice()
        .filter((todo) => todo.id !== action.payload && todo.status !== TodoStatus.DELETED);

      return {
        ...state,
        todos
      };
    }

    default:
      return state;
  }
}

export default reducer;