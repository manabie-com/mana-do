import React from 'react'
import './Button.css'

export type Props = {
  children: string,
  className?: string,
  onClick?: (value?: any) => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  dataTestId?: string
};

const Button = ({ children, className='', onClick, type='button', variant='primary', dataTestId }: Props) => {
  const buttonStyleMapper = {
    primary: 'button__primary',
    secondary: 'button__secondary'
  }

  return (
    <button 
      className={`${className} button ${buttonStyleMapper[variant]}`} 
      type={type} 
      onClick={onClick}
      data-testid={dataTestId}
    >
      {children}
    </button>
  )
};

export default Button
