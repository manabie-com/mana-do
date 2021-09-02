import React from "react";
import "./Checkbox.css";

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  name: string;
  id: string;
  fullWidth?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  name,
  id,
  fullWidth = false,
}) => {
  return (
    <React.Fragment>
      <label
        htmlFor={id}
        className={`Checkbox__item ${fullWidth ? "w-100" : ""}`}
      >
        <input
          name={name}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {label && <span className="Checkbox__label">{label}</span>}
      </label>
    </React.Fragment>
  );
};

export default Checkbox;
