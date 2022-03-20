import React, { ComponentPropsWithoutRef } from "react";
import Styles from "./button.module.scss";

type ButtonProps = {
  variant?: "primary" | "danger" | "success";
} & ComponentPropsWithoutRef<"button">;

const Button = ({ variant = "primary", className, onClick, children }: ButtonProps) => {
  const ButtonClassName = `${Styles.Button} ${className}`;

  return (
    <button btn-variant={variant} className={ButtonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
