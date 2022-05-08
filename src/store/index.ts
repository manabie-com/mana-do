import { useEffect, useReducer, useRef } from "react";
import deepEqual from "fast-deep-equal/es6";

export function usePersistedReducer<State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State,
  storageKey: string
) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const prevState = usePrevious(state);

  function init(): State {
    const stringState = localStorage.getItem(storageKey);
    if (stringState) {
      try {
        return JSON.parse(stringState);
      } catch (error) {
        return initialState;
      }
    } else {
      return initialState;
    }
  }

  useEffect(() => {
    const stateEqual = deepEqual(prevState, state);
    if (!stateEqual) {
      const stringifiedState = JSON.stringify(state);
      localStorage.setItem(storageKey, stringifiedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { state, dispatch };
}

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
