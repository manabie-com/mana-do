import produce, { current } from 'immer';
import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
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
    case CREATE_TODO:
      return produce(state, (draft) => {
        draft.todos.push(action.payload);
      });

    case UPDATE_TODO_STATUS:
      return produce(state, (draft) => {
        const todoIndex = current(draft).todos.findIndex(
          (todo) => todo.id === action.payload.todoId
        );
        draft.todos[todoIndex].status = action.payload.checked
          ? TodoStatus.COMPLETED
          : TodoStatus.ACTIVE;
      });

    case TOGGLE_ALL_TODOS:
      return produce(state, (draft) => {
        const currentState = current(draft);
        for (let i = 0; i < currentState.todos.length; i++) {
          draft.todos[i].status = action.payload
            ? TodoStatus.COMPLETED
            : TodoStatus.ACTIVE;
        }
      });

    case DELETE_TODO:
      return produce(state, (draft) => {
        const todoIndex = current(draft).todos.findIndex(
          (todo) => todo.id === action.payload
        );
        draft.todos.splice(todoIndex, 1);
      });

    case DELETE_ALL_TODOS:
      return produce(state, (draft) => {
        draft.todos = [];
      });

    case SET_TODO:
      return produce(state, (draft) => {
        draft.todos = action.payload;
      });

    default:
      return state;
  }
}

export default reducer;
