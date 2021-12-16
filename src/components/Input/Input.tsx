import clsx from "clsx";
import React from "react";

import styles from "./Input.module.css"

export interface IInput {
  className?: string,
  placeholder?: string,
  onKeyDown?: Function,
  onBlur?: Function
}

const Input = React.forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const {className, onKeyDown, placeholder, onBlur} = props

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(onKeyDown) {
      onKeyDown(e.key)
    }
  }

  const handleBlur = () => {
    if(onBlur) {
      onBlur()
    }
  }

  return(
    <input
      className={clsx(styles.root, className && className)}
      ref={ref}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  )
})

export default React.memo(Input)