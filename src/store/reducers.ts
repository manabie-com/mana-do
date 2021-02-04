import { combineReducers } from '@reduxjs/toolkit';
import { reducer as todoPage } from 'containers/ToDoPage/slice';

export const rootReducer = combineReducers({
  todoPage,
});
