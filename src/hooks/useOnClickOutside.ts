import { RefObject, useEffect, useRef } from "react";

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      const el = ref?.current;
      if (el && !el.contains(event.target as Node)) {
        savedHandler.current(event);
      }
    };

    document.addEventListener(mouseEvent, checkIfClickedOutside);

    return () => {
      document.removeEventListener(mouseEvent, checkIfClickedOutside);
    };
  }, [mouseEvent, ref]);
}

export default useOnClickOutside;
