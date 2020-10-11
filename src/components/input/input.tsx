import React from "react";
import "./input.scss";

export type InputProps = {
  onChange?: (value: any) => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "text" | "password" | "number" | "checkbox" | "submit";
  label?: string;
  className?: string;
  name?: string;
  placeholder?: string;
  hidden?: boolean;
  defaultValue?: string;
};

export const Input: React.FC<InputProps> = ({
  type,
  onChange,
  disabled,
  label,
  name,
  className = "",
  placeholder,
  hidden,
  defaultValue,
}) => {
  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    onChange?.(value);
  };

  return (
    <label htmlFor={name}>
      {label}
      <input
        className={`input ${className}`}
        id={name}
        name={name}
        type={type}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        hidden={hidden}
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default Input;
