import React from 'react';
import styles from './styles.module.scss';
enum ButtonTypes {
  button = "button",
  submit= "submit"
} 

interface ButtonProps {
  onClick?: () => void,
  type?: ButtonTypes;
  className?: string;
  id?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, type, id }) => (
  <button
    type={type}
    data-testid={id}
    onClick={onClick}
    className={`${className} ${styles.Button}`}
  >
    {children}
  </button>
);

Button.defaultProps = {
  className: '',
  type: ButtonTypes.button
}

export default Button;
