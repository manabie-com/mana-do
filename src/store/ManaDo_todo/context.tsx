import React from "react";
import { AppActions } from "./actions";
import reducer from "./reducer";
import { ITodoType } from "./types";

export const TodoContext = React.createContext([{}, {}] as [
  ITodoType,
  React.Dispatch<AppActions>
]);

const initialState: ITodoType = {
  todos: [],
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
