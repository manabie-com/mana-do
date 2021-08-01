import React, { useContext } from 'react';
import { ITodoActions, ITodoState } from './store/todo.constant';

export interface ITodoContext {
  state: ITodoState;
  dispatch: (action: ITodoActions) => void;
}

export const TodoContext = React.createContext<ITodoContext | {}>({});
export const useTodoContext = () => useContext(TodoContext) as ITodoContext