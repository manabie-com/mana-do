import cn from "classnames";
import React, { forwardRef } from "react";
import "./style.css";

interface InputProps {
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  name?: string;
  id?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
}

const Input = forwardRef((props: InputProps, ref: any) => {
  const { value, className, disabled, ...rest } = props;
  const classOfRoot = cn("root-input", className);
  const classOfInputBase = cn(
    "input-custom",
    "input-size-md",
    disabled && "input-custom__disabled"
  );

  return (
    <div className={classOfRoot}>
      <input value={value} className={classOfInputBase} ref={ref} {...rest} />
    </div>
  );
});

export default Input;
