import React, {useEffect} from 'react';

const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: (e?: MouseEvent) => void) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
      };
    },
    [ref, handler]
  );
}

export {
  useOnClickOutside,
}
