import React, { Fragment, useEffect, useRef } from "react";
import "./Modal.scss";

export const Modal: React.FC<IModal> = ({
  children,
  isShow,
  className,
  setIsShow,
  backgroundColorOverlay,
  classNameContainer,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShow) {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShow(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [ref, isShow, setIsShow]);

  return (
    <Fragment>
      {isShow && (
        <div
          className={`modal ${classNameContainer}`}
          style={{ backgroundColor: backgroundColorOverlay }}
        >
          <div className={`modal__container ${className}`} ref={ref}>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
};
