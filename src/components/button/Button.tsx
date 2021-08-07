import React from 'react';
import './Button.css';

const Button = ({ title, type = 'default', ...rest }: any) => {
  return (
    <button className='btn' type={type} {...rest}>
      {title}
    </button>
  );
};

export const ButtonDanger = ({ title, type = 'default', ...rest }: any) => {
  return (
    <button className='btn btn-danger' type={type} {...rest}>
      {title}
    </button>
  );
};

export default Button;
