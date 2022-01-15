import React from "react";
import clsx from "clsx";

import styles from "./Input.module.scss";

export interface IInputProps {
  className?: string,
  placeholder?: string,
  type?: string,
  name?: string,
  disabled?: boolean,
  onChange?: Function,
  onKeyDown?: Function
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { 
    className, 
    placeholder,
    type = "text",
    disabled = false,
    name,
    onChange,
    onKeyDown
  } = props;

  const hanleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange({
        name, 
        value: e.target.value
      })
    } 
  }

  return (
    <input
      data-test="input"
      ref={ref}
      className={clsx(styles.root, className && className)}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      onKeyDown={hanleKeyDown}
      onChange={handleChange}
    />
  )
})

export default Input;