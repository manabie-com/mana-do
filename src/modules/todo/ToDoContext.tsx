import React, { useContext } from 'react';
import { TodoActions } from './store/actions';
import { TodoState } from './store/reducer';

export interface TodoContext {
  state: TodoState;
  dispatch: (action: TodoActions) => void;
}

export const TodoContext = React.createContext<TodoContext | {}>({});
export const useTodoContext = () => useContext(TodoContext) as TodoContext