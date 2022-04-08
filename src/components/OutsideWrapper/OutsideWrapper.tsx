import React, { ReactChild, ReactChildren, useEffect, useRef } from "react";

interface AuxProps {
  children: ReactChild | ReactChildren;
  onClickOutside: () => void;
}

// Create a hook to detect outside click of component
function useOutsideDetecter(
  ref: React.MutableRefObject<any>,
  onClickOutside: () => void
) {
  useEffect(() => {
    // Function handle if clicked outside of element
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    // Bind event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

// Wrapper that detect when you click outside of child component
function OutsideWrapper({ children, onClickOutside }: AuxProps) {
  const wrapperRef = useRef(null);
  useOutsideDetecter(wrapperRef, onClickOutside);
  return (
    <div style={{ width: "100%" }} ref={wrapperRef}>
      {children}
    </div>
  );
}

export default OutsideWrapper;
