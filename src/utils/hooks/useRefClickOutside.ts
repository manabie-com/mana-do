import {RefObject, useEffect} from "react";

const useRefClickOutside = (ref : RefObject<HTMLInputElement>, onClickOutsideHandler: () => void) : void => {
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
