import React, { Dispatch, SetStateAction } from "react";

const PREFIX = "PT_APP_";

const useLocalStorage = function (
  key = "",
  initalValue = ""
): [string, Dispatch<SetStateAction<string>>] {
  const PREFIXED_KEY = PREFIX + key;

  const [value, setValue] = React.useState(() => {
    const localValue = localStorage.getItem(PREFIXED_KEY) || null;

    if (localValue) {
      return JSON.parse(localValue);
    }

    return initalValue;
  });

  React.useEffect(() => {
    localStorage.setItem(PREFIXED_KEY, JSON.stringify(value));
  }, [PREFIXED_KEY, value]);

  return [value, setValue];
};

export default useLocalStorage;
