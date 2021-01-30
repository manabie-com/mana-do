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
    width: valueWidth ? `${valueWidth}` : "100%",
    outline: "none",
    padding: "0 12px",
    borderRadius: "15px",
    border: "1px solid #ececec",
    backgroundColor: "#ececec",
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
