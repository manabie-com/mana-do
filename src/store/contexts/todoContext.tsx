import React from "react";
import { AppActions } from "../actions/todoActions";
import reducer from "../reducers/todoReducers";
import { ITodoType } from "../types/todoType";

export const TodoContext = React.createContext([{}, {}] as [
  ITodoType,
  React.Dispatch<AppActions>
]);

const initialState: ITodoType = {
  todos: [],
  refreshTrigger: {},
};

const TodoProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={[state, dispatch]}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
