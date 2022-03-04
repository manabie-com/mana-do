import { Todo } from '../models/todo';
import { AppActions, SET_TODO } from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState = initialState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
