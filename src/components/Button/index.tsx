import React from 'react';
import './style.scss';

type ButtonProps = {
  onClick?: React.FormEventHandler<any>;
  style?: React.CSSProperties;
  children?: any;
  className?: string;
  type?: "button" | "submit";
  center?: boolean;
  colorType?:string;
  size?:string;
  active?:any;
};
const Button = (props : ButtonProps) => {
  const { onClick, className, style, type, children, colorType, size, active } = props;
  return (
    <div className={`custom-button ${className ? className : ''} ${active ? "btn--active" : ''}`} style={style}>
      <button onClick={onClick} className={`btn--color--${colorType ? colorType : 'default'} btn--size--${size} `} type={type}>{children}</button>
    </div>
  );
};

export default Button;
