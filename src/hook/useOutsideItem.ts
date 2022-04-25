import { useEffect } from 'react';

export const useOutsideItem = (ref: any, action: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ref.current.id
      ) {
        action();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [action, ref]);
};
