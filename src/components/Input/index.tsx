import React from "react";
import "./index.css";

const Input = ({ label,name, value, onChange, type }: any) => {
  return (
    <label htmlFor={label}>
      {label}
      <input
        className="Input__input"
        id={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </label>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
