import React from "react";
import "./checkbox.css";

interface ICheckBox {
  checked: boolean;
  onChange: React.ChangeEventHandler;
}

const CheckBox: React.FC<ICheckBox> = ({ ...props }) => {
  return (
    <label className="checkbox" id="checkbox">
      <input type="checkbox" {...props} />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
