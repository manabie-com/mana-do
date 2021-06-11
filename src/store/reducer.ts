import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
} from './actions';
import service from '../service/api-frontend';

export interface AppState {
  todos: Record<string, Todo>;
}

export const initialState: AppState = {
  todos: {},
};

function reducer(state: AppState, action: AppActions): AppState {
  let todos = { ...state.todos };

  switch (action.type) {
    case SET_TODO: {
      todos = action.payload.reduce((record, todo) => {
        record[todo.id] = todo;
        return record;
      }, {} as Record<string, Todo>);

      break;
    }

    case CREATE_TODO: {
      const newTodo = action.payload;
      todos[newTodo.id] = newTodo;
      break;
    }

    case UPDATE_TODO: {
      const todo = action.payload;
      todos[todo.id] = todo;
      break;
    }

    case TOGGLE_ALL_TODOS: {
      Object.values(todos).forEach(({ id }) => {
        todos[id].status = action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      });

      break;
    }

    case DELETE_TODO: {
      delete todos[action.payload];
      break;
    }

    case DELETE_ALL_TODOS:
      todos = {};
      break;

    default:
      break;
  }

  service.persistToDo(Object.values(todos));

  return {
    ...state,
    todos,
  };
}

export default reducer;
