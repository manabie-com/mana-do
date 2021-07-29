import { useReducer } from "react";
import useLocalStorage from "./useLocalStorage";

function remove({ blacklist, state }: any) {
  return Object.keys(state).reduce((accumulator: any, current) => {
    if (!blacklist.includes(current)) {
      accumulator[current] = state[current];
    }
    return accumulator;
  }, {});
}

function useReducerWithLocalStorage({
  blacklist = [],
  initializerArg,
  key,
  reducer,
}: any) {
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    key,
    remove({ blacklist, state: initializerArg })
  );

  return useReducer(
    (state: any, action: any) => {
      const newState = reducer(state, action);
      setLocalStorageState(remove({ blacklist, state: newState }));
      return newState;
    },
    { ...initializerArg, ...localStorageState }
  );
}

export default useReducerWithLocalStorage;
