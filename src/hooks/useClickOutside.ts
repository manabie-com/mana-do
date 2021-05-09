import { useEffect } from 'react';

function useOnClickOutside(ref: any, handler: Function) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (ref?.current?.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
