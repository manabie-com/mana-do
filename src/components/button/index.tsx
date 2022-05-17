import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import "./styles.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "warning" | "error" | "success" | "default" | "secondary",
  variant?: "fill" | "icon"
  children: React.ReactNode
}
const Button: FunctionComponent<ButtonProps> = ({ color = "default", children, variant = "fill", ...rest }) => {
  return (
    <button {...rest} className={`Action__btn Action__btn--${color} Action__btn--${variant}`}>
      {children}
    </button>
  );
}

export default Button