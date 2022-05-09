import React from 'react';
import { AppActions } from '../store/actions';
import reducer, { AppState, initialState } from '../store/reducer';

const defaultContext = {
  state: initialState,
  dispatch: () => null,
};

const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}>(defaultContext);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
