import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import clsx from "clsx"

import styles from "./OutsideClickHandler.module.scss";

export interface IOutsideClickHandlerProps {
  className?: string,
  children?: ReactNode,
  onClose?: Function,
  closeOnEscPress?: boolean
}

const OutsideClickHandler = (props: IOutsideClickHandlerProps) => {
  const { className, onClose, children, closeOnEscPress = false } = props
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((event: MouseEvent): void => {
    if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      onClose && onClose();
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  const handleEscapePress = useCallback((event: KeyboardEvent): void => {
    if(event.key === "Escape") {
      onClose && onClose();
    }
  }, [onClose])

  useEffect(() => {
    if (closeOnEscPress) {
      document.addEventListener("keydown", handleEscapePress, false);
      return () => {
        document.removeEventListener("keydown", handleEscapePress, false);
      }
    }
  }, [handleEscapePress, closeOnEscPress])

  return (
    <div 
      className={clsx(styles.root, className && className)} 
      ref={wrapperRef}
      data-test="outside-click-handler"
    >
      { children && children }
    </div>
  )
}

export default OutsideClickHandler
