import React from 'react';
import { Todo } from '../models/todo';
import { AppActions } from '../store/actions';
import reducer, { initialState } from '../store/reducer';

interface ToDoPageContextInterface {
  todos: Array<Todo>;
  dispatch: React.Dispatch<AppActions>;
}

const ToDoPageContext = React.createContext<ToDoPageContextInterface | null>(
  null
);

const ToDoPageProvider: React.FC = ({ children }) => {
  const [{ todos }, dispatch] = React.useReducer(reducer, initialState);
  const value: ToDoPageContextInterface = {
    todos,
    dispatch,
  };
  return (
    <ToDoPageContext.Provider value={value}>
      {children}
    </ToDoPageContext.Provider>
  );
};

export const useToDoPageContext = (): ToDoPageContextInterface => {
  const context = React.useContext(ToDoPageContext);
  if (!context)
    throw new Error('useToDoPageContext need using in ToDoPageProvider');
  return context;
};

export default ToDoPageProvider;
