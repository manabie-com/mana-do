import { Todo } from '../models/todo';
import {
  AppActions,
  SET_TODO,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
}

// Reducer shouldn't handle a lot of business code, it should be as little as possible
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    // Remove CREATE_TODO, TOGGLE_ALL_TODOS because I moved the logic code to todo.service.ts
    // Refactor SET_TODO for return new todo or list todo 
    case SET_TODO:
      return { ...state, todos: action.payload }
    // Remove DELETE, UPDATE_TODO_STATUS, TOGGLE_ALL_TODOS action because I moved the logic code to todo.service.ts, no need to do those action here
    // Need to refresh list by get todo list from server
    default:
      return state;
  }
}

export default reducer;