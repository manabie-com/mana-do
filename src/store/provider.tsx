import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { AppActions } from "./actions";
import  reducer, { AppState, initialState } from "./reducer";

export const StoreContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => null
});

type Props = {
  children: ReactNode;
};

export const StoreProvider = ({ children } : Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
};