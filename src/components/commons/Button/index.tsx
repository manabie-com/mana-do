import React, { forwardRef } from "react";
import cn from "classnames";
import "./style.css";

export enum ButtonSizes {
  lg = "lg",
  md = "md",
  xs = "xs",
}

export enum ButtonColors {
  primary = "primary",
  danger = "danger",
}

interface ButtonProps {
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: (event: React.SyntheticEvent) => void;
  color?: ButtonColors;
  className?: string;
  children?: React.ReactNode;
}

const defaultProps: ButtonProps = {
  disabled: false,
  fullWidth: true,
  type: "button",
  color: ButtonColors.primary,
};

const Button = forwardRef((props: ButtonProps, ref: any) => {
  const { color, className, children, disabled, fullWidth, type, ...rest } = {
    ...defaultProps,
    ...props,
  };

  const classOfComponent = cn(
    className,
    "btn-custom",
    `btn-custom-${color}`,
    disabled && "btn-custom-disabled"
  );

  return (
    <button
      className={classOfComponent}
      ref={ref}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
