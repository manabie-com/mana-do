import React, { useEffect, useReducer } from "react";
import { AppActions } from "../store/actions";
import reducer, { AppState, initialState } from "../store/reducer";

export interface IContextModel {
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}

export const Context = React.createContext({} as IContextModel);

export const Provider: React.FC = ({ children }) => {
  const STORAGE_KEY = "todos";

  // load data initially
  const [state, dispatch] = useReducer(reducer, initialState, (state) => {
    const persistedData = localStorage.getItem(STORAGE_KEY);
    const todos = persistedData ? JSON.parse(persistedData) : [];
    return { ...state, todos };
  });

  // save data on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
