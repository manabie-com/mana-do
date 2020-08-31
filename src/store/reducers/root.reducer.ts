import { combineReducers } from 'redux';
import { todosReducer } from './todo.reducer';

export const rootReducer = combineReducers({
  todos: todosReducer,
});
