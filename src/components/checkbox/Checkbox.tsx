import { InputType } from "models";
import React, { FC, memo } from "react";
import "./styles.scss";

export interface ICheckboxProps {
  checked?: boolean;
  id?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<ICheckboxProps> = ({
  checked,
  onChange,
  className,
  id,
  ...props
}) => {
  return (
    <input
      type={InputType.CHECKBOX}
      checked={checked}
      onChange={onChange}
      data-testid="checkbox"
      id={id || ""}
      className={`cbx-todo ${className ? className : ""}`}
      {...props}
    />
  );
};

export default memo(Checkbox);
