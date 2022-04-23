import { useState, useEffect } from "react";

export function useSingleAndDoubleClick(
  simpleClick: () => void,
  doubleClick: () => void,
  delay = 250
) {
  const [click, setClick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (click === 1) simpleClick();
      setClick(0);
    }, delay);

    if (click === 2) doubleClick();

    return () => clearTimeout(timer);
  }, [click, simpleClick, doubleClick, delay]);

  return () => setClick((prev) => prev + 1);
}
