import React, { InputHTMLAttributes, RefObject } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  inputRef?: RefObject<HTMLInputElement>;
  valueWidth?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  inputRef,
  valueWidth,
  ...rest
}) => {
  const styleInput: React.CSSProperties = {
    minHeight: "50px",
    outline: "none",
    padding: "0 12px",
    fontSize: "15px",
  };
  return (
    <>
      <input {...rest} name={name} ref={inputRef} style={styleInput} />
    </>
  );
};

Input.defaultProps = {
  type: "text",
  className: "",
};

export default Input;
