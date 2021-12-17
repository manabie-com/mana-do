import React, { createContext, useEffect, useReducer, Dispatch } from "react";
import { AppState, initialState } from "./reducer";
import { AppActions } from "./actions";
import reducer from "./reducer";

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
