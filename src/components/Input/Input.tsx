import React from "react";
import "./Input.scss";

export const Input = React.forwardRef<any, IInput>(
  (
    {
      onChange,
      value,
      name,
      id,
      label,
      className,
      type,
      error,
      onKeyDown,
      placeholder,
    },
    ref
  ) => {
    return (
      <div className={`input ${className}`}>
        <label htmlFor={id}>
          {label && <span className="input__lable">{label}</span>}
          <input
            ref={ref}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="input__input"
            type={type}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
          />
        </label>
        <span className="input__error" style={{ opacity: error ? 1 : 0 }}>
          {error}
        </span>
      </div>
    );
  }
);
