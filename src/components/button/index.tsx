import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import "./styles.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "warning" | "error" | "success" | "default" | "secondary",
  children: React.ReactNode
}
const Button: FunctionComponent<ButtonProps> = ({ color = "default", children, ...rest }) => {
  return (
    <button {...rest} className={`Action__btn Action__btn--${color}`}>
      {children}
    </button>
  );
}

export default Button