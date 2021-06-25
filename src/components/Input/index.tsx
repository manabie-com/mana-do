import React, { memo } from 'react'

import './Input.css'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { disabled, defaultValue, placeholder, className, onKeyDown, onBlur },
    ref
  ) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`my-input ${className ?? ''}`}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    )
  }
)

export default memo(Input)
