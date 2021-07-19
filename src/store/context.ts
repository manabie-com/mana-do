import React from "react";
import { AppActions } from "./actions";
import { AppState, initialState } from "./reducer";
export const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
  }>({
      state: initialState,
      dispatch: () => undefined,
  });