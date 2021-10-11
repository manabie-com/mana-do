import { combineReducers } from 'redux';
import { todoReducer, todoName } from './todo';

export default combineReducers({
  [todoName]: todoReducer
});