import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  EDIT_TODO,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  let updateState;
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      updateState = { ...state };
      break;

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      updateState = {
        ...state,
        todos: state.todos,
      };
      break;

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      updateState = {
        ...state,
        todos: tempTodos,
      };
      break;

    case DELETE_TODO:
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      const itemUpdated = {
        ...state.todos[index1],
        status: TodoStatus.DELETED,
      };
      state.todos.splice(index1, 1, itemUpdated);

      updateState = {
        ...state,
        todos: state.todos,
      };
      break;

    case DELETE_ALL_TODOS:
      const todosUpdated = state.todos.map((todo) => ({
        ...todo,
        status: TodoStatus.DELETED,
      }));

      updateState = {
        ...state,
        todos: todosUpdated,
      };
      break;

    case SET_TODO:
      updateState = {
        ...state,
        todos: action.payload,
      };
      break;

    case EDIT_TODO:
      let index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos.splice(index, 1, action.payload);
      updateState = {
        ...state,
        todos: state.todos,
      };
      break;

    default:
      updateState = { ...state };
      break;
  }
  saveToLocalStorage(updateState.todos);
  return updateState;
}

const saveToLocalStorage = (todos: Todo[]) => {
  let stringify = todos ? JSON.stringify(todos) : JSON.stringify([]);
  localStorage.setItem('todos', stringify);
};

export default reducer;
