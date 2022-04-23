import React from 'react'
import './index.css';
type Props = {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children: JSX.Element | string,
    color?: string,
};

export const Button = ({className, onClick, color, children}: Props) => {
  return (
    <button 
        className={`mana_btn ${className} mana_btn--${color}` }
        onClick={onClick}
    >
        {children}
    </button>
  )
}
