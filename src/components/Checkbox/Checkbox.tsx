import * as React from "react";
import "./Checkbox.scss";

interface CheckboxProps {
  checked: boolean;
  onToggleCheck: React.MouseEventHandler;
}

const Checkbox = ({ checked, onToggleCheck }: CheckboxProps) => {
  return (
    <>
      <span className="success-checkmark" onClick={onToggleCheck}>
        <div className="icon-circle" hidden={checked}></div>
        <div className="check-icon" hidden={!checked}>
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </span>
    </>
  );
};

export default Checkbox;
