import React, { memo } from 'react'

import './Button.css'

type ButtonSize = 'default' | 'large' | 'small'
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean
  size?: ButtonSize
}

const getClassBySize = (size: ButtonSize): string => {
  switch (size) {
    case 'large':
      return 'my-btn-lg'
    case 'small':
      return 'my-btn-sm'
    default:
      return ''
  }
}

const Button: React.FC<IProps> = ({
  danger,
  disabled,
  size = 'default',
  className,
  title,
  children,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={`my-btn 
        ${danger ? 'my-btn-danger' : ''} 
        ${className ?? ''}
        ${getClassBySize(size)}
        `}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default memo(Button)
