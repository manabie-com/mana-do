import React, { ComponentPropsWithoutRef } from "react";
import Styles from "./button.module.scss";

type ButtonProps = {
  testId: string;
  variant?: "primary" | "danger" | "success";
  active?: boolean;
} & ComponentPropsWithoutRef<"button">;

const Button = ({ testId, variant = "primary", active, className, onClick, children }: ButtonProps) => {
  const ButtonClassName = `${Styles.Button} ${active ? Styles.Active : ""} ${className}`;

  return (
    <button btn-variant={variant} data-testid={testId} className={ButtonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
