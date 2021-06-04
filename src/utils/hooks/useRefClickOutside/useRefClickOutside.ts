import {RefObject, useEffect} from 'react';

/**
 * Util to detect whether if user click outside of the ref element
 *
 * @param ref: the element to check
 * @param onClickOutsideHandler: action to fire when user click outside of the ref
 */

const useRefClickOutside = (ref : RefObject<HTMLElement>, onClickOutsideHandler: () => void) : void => {
  const onClickOutside = (e : any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClickOutsideHandler();
    }
  }

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    }
  });
}

export default useRefClickOutside;
