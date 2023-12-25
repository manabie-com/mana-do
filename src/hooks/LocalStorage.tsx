import { useState, useEffect } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [state, setState] = useState();

  useEffect(() => {}, [state, key]);
  return [state, setState];
};

