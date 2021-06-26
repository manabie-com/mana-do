import React, { memo } from 'react'

import './Input.css'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input {...rest} ref={ref} className={`my-input ${className ?? ''}`} />
    )
  }
)

export default memo(Input)
