import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  name: string;
  valueWidth?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  name,
  valueWidth,
  ...rest
}) => {
  const styleButton: React.CSSProperties = {
    outline: "none",
    border: "none",
    minHeight: "40px",
    width: valueWidth ? `${valueWidth}` : "100%",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    padding: "10px",
    whiteSpace: "nowrap",
  };
  return (
    <>
      <button {...rest} name={name} style={styleButton}>
        {label}
      </button>
    </>
  );
};

Button.defaultProps = {
  type: "button",
};

export default Button;
