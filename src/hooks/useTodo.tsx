import React, { ReactNode, useContext } from "react";
import { createContext } from "react";
import { AppActions } from "../store/actions";
import { AppState, initialState, useTodoReducer } from "../store/reducer";

export interface TodoContextType {
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}

export const TodoContext = createContext<TodoContextType>({
  state: initialState,
  dispatch: () => undefined,
});

interface IProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: IProps) => {
  const [state, dispatch] = useTodoReducer();

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext<TodoContextType>(TodoContext);
