import { EventListenerType } from "models";
import { useEffect, RefObject } from "react";

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(EventListenerType.MOUSEDOWN, listener);
    document.addEventListener(EventListenerType.TOUCHSTART, listener);

    return () => {
      document.removeEventListener(EventListenerType.MOUSEDOWN, listener);
      document.removeEventListener(EventListenerType.TOUCHSTART, listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
