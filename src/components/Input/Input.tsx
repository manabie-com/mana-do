import React, { memo } from "react";
import clsx from "clsx";

import styles from "./Input.module.scss";

export interface IInputProps {
  className?: string,
  placeholder?: string,
  type?: string,
  name?: string,
  value?: string | number,
  defaultValue?: string | number,
  disabled?: boolean,
  onChange?: Function,
  onKeyDown?: Function,
  autoFocus?: boolean
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { 
    className, 
    placeholder,
    type = "text",
    disabled = false, autoFocus = true,
    name,
    onChange, onKeyDown,
    value, defaultValue,
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
      value={value}
      defaultValue={defaultValue}
      onKeyDown={hanleKeyDown}
      onChange={handleChange}
      autoFocus={autoFocus}
    />
  )
})

export default memo(Input);