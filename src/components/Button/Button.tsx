import React, { MouseEventHandler, ReactChild } from "react";
import clsx from "clsx";

import styles from "./Button.module.css"

export interface IButton {
  className?: string,
  onClick?: MouseEventHandler,
  children?: ReactChild
}

const Button = (props: IButton) => {
  const { className, onClick, children } = props

  return (
    <button 
      className={clsx(styles.root, className && className)}
      onClick={onClick && onClick}
    >
      {children}
    </button>
  )
}

export default React.memo(Button)