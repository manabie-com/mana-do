import { Dispatch, useEffect, useReducer } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "storage";
import { AppActions } from "store/actions";

import reducer, { AppState, initialState } from "store/reducer";

const LOCAL_STORAGE_KEY = "mana-persisted-data";

export type UsePersistReducerReturnValueType = [AppState, Dispatch<AppActions>];

const usePersistReducer = (): UsePersistReducerReturnValueType => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initial) => getFromLocalStorage(LOCAL_STORAGE_KEY) || initial
  );
  
  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, state)
  }, [state]);

  return [state, dispatch];
}

export default usePersistReducer;
