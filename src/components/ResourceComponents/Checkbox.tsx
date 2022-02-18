import React, { ChangeEventHandler, useEffect, useState } from "react";

import { TodoStatus } from "../../models/todo";
import './style.css'

type TodoItemProps = {
    text?: string,
    defaultChecked?: boolean,
    offsetAnimation?: number,
    onChange?: (arg: boolean) => any
}

const Checkbox = (props: TodoItemProps) => {
  const {text, defaultChecked, onChange, offsetAnimation = 0} = props
  const [checked, setChecked] = useState<boolean>(defaultChecked || false);
  const _onChange = () => {
      setChecked((checked)=>{
        onChange?.(!checked);
        return !checked;
      })
  }
  useEffect(()=>{
    setChecked(defaultChecked as boolean)
  },[defaultChecked]);
  return (
    <div className={`custom-checkbox ${checked? 'checked': ''}`}
        style={{animationDelay: offsetAnimation + 's'}}
    onClick={_onChange}>
      <span className="checkmark">{text}</span>
    </div>
  );
};

export default Checkbox;
