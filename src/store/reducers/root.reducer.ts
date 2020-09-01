import { combineReducers } from 'redux';
import { todosReducer, TodosState } from './todos.reducer';

export interface Store {
  todos: TodosState;
}

export const rootReducer = combineReducers({
  todos: todosReducer,
});
