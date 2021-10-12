import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useClickOutsideComponent(ref: any, onClickOutside: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

/**
 * Component that alerts if you click outside of it
 */
interface Props {
  onClickOutside?: () => void;
  children?: React.ReactNode;
}

function ClickOutsideComponent(props: Props) {
  const { onClickOutside = () => null, children } = props;

  const wrapperRef = useRef(null);
  useClickOutsideComponent(wrapperRef, onClickOutside);

  return <div ref={wrapperRef}>{children}</div>;
}

export default ClickOutsideComponent;
