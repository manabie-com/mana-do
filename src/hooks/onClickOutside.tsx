import React, { useRef, useEffect, FunctionComponent } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutside(ref: any, callback: Function) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (callback) {
          callback()
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

/**
 * Component that alerts if you click outside of it
 */

interface Props {
  callback: Function
  className?: string
  children: React.ReactNode
}

const  ClickOutsideHandler: FunctionComponent<Props> = (props) => {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, props.callback);

  return <div className={props.className || ''} ref={wrapperRef}>{props.children}</div>;
}

export default ClickOutsideHandler;
