import React, { createContext, useReducer, Dispatch } from 'react';
import { AppActions } from '../store/actions';
import reducer, { AppState, initialState } from '../store/reducer';

const defaultContext = {
  state: initialState,
  dispatch: () => null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppActions>;
}>(defaultContext);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
