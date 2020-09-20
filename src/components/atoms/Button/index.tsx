import React, { ReactNode } from 'react';

export type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  children: ReactNode;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const Button = ({ type, className, children, onClick }:Props) => {
  return (  
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;