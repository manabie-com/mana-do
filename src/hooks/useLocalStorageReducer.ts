import React, { useReducer, Dispatch } from "react";

export function useLocalStorageReducer<T, A>(
  key: string,
  defaultValue: T,
  reducer: (value: T, action: A) => T,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [T, Dispatch<A>] {
  const [state, dispatch] = useReducer(reducer, defaultValue, () => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return deserialize(value);
      }
      return defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
  }, [key]);

  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state as T, dispatch];
}
