import React, { Dispatch, SetStateAction } from "react";

const useLocalStorage = function (
  key = "",
  initialValue = ""
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = React.useState(() => {
    const localValue = localStorage.getItem(key) || null;

    if (localValue) {
      return JSON.parse(localValue);
    }

    return initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
