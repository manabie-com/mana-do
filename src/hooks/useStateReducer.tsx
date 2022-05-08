import { LOCAL_STORAGE_KEY } from "models";
import { Dispatch, useEffect, useReducer } from "react";
import { AppActions } from "store/actions";
import reducer, { AppState, initialState } from "store/reducer";
import { getLocalStorage, setLocalStorage } from "utils/storage";

type TUseStateReducerReturnType = [AppState, Dispatch<AppActions>];

const useStateReducer = (): TUseStateReducerReturnType => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (init) => getLocalStorage(LOCAL_STORAGE_KEY) || init
  );

  useEffect(() => {
    setLocalStorage(LOCAL_STORAGE_KEY, state);
  }, [state]);

  return [state, dispatch];
};

export default useStateReducer;
