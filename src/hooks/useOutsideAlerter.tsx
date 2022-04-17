import { RefObject, useEffect } from 'react';

function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  callback?: () => void,
  deps?: any[],
): void {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        typeof callback === 'function' && callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...(deps || [])]);
}

export default useOutsideAlerter;
