import React from "react";
import "./button.scss";

export type ButtonProps = {
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
};

export const Button: React.FC<ButtonProps> = ({
  type,
  loading,
  onClick,
  children,
  disabled,
  className = "",
  variant = "secondary",
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={loading || disabled}
      className={`button ${className} ${variant}`}
    >
      {loading && "loading"}
      {children}
    </button>
  );
};

export default Button;
