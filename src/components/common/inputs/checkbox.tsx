import React, { FunctionComponent } from "react";

interface Props {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean
}

const Checkbox: FunctionComponent<Props> = ({ checked, onChange, disabled = false }) => {
  return <input disabled={disabled} type="checkbox" checked={checked} onChange={onChange} />;
};

export default Checkbox;
