import React from 'react';
import './style.scss';

type InputProps = {
  onChange?: React.FormEventHandler<any>;
  style?: React.CSSProperties;
  children?: any;
  className?: string;
  label?: string;
  placeHolder?: any;
  value?: string | undefined | number ;
  name?: string;
  id?: string;
  type?: string;
  ref?: any;
  checked?:any;
  placeholder?:string;
};
const Input = (props : InputProps) => {
  const { label, onChange, placeHolder, className, value, name, id, type, ref, checked } = props;
  return (
    <div className={`custom-input ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input ref={ref} type={type} onChange={onChange} placeholder={placeHolder} value={value} name={name} id={id}  checked={checked}></input>
    </div>
  );
};

export default Input;