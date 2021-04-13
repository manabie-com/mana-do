import React, { MouseEventHandler, CSSProperties, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  name?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, style, disabled, ...args }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      style={{ backgroundColor: '#337ab7', color: '#fff', ...style }}
      {...args}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  style: {},
  className: '',
  type: 'button',
  disabled: false
};

export default Button;
