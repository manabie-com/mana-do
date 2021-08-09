import React from 'react';
import Label from "../../Atoms/Label"
import Input from "../../Atoms/Input"
import "./index.css"

const FormInput = ({label, value, id, name, onChangeField, className, ...props}: any) => {
  return <div className={`Form__input ${className || ''}`}>
    <Label htmlFor={id} text={label}/>
    <Input
      id={id}
      name={name}
      value={value}
      onChange={onChangeField}
      {...props}/>
  </div>;
};

export default FormInput;
