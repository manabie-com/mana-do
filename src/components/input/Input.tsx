import React, { forwardRef, InputHTMLAttributes, memo } from "react";
import { InputType } from "../../models";
import "./styles.scss";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ placeholder, disabled, onKeyDown, className, id, name, ...props }, ref) => {
    return (
      <input
        type={InputType.TEXT}
        disabled={disabled}
        ref={ref}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={`input-todo ${className ? className : ""}`}
        id={id || ""}
        name={name}
        data-testid="input"
        {...props}
      />
    );
  }
);

export default memo(Input);
