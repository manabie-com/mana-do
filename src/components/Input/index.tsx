import React, { memo } from 'react'

import './Input.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, placeholder, onKeyDown }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        placeholder={placeholder}
        className='my-input'
        onKeyDown={onKeyDown}
      />
    )
  }
)

export default memo(Input)
