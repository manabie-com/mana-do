import React from 'react';
import './style.scss';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className='button' {...props} />
  );
};

export default Button;