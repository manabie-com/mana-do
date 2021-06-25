import React, { memo } from 'react'

import './Button.css'

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean
}

const Button: React.FC<IProps> = ({
  danger,
  disabled,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      className={`my-btn ${danger ? 'my-btn--danger' : ''} ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default memo(Button)
