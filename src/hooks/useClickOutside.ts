import { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  listener: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        listener();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, listener]);
};

export default useClickOutside;
