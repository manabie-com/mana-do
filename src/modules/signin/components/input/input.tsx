import React from 'react';
import "./input.scss";

interface InputProps {
  label: string,
  id: string,
  name: string,
  type: string,
  onChangeValue: (name: string, value: string) => void;
}

const Input = (props: InputProps) => {
  const { label, id, name, type, onChangeValue } = props;

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const name = e.target.name;
    const inputValue = e.target.value;
    onChangeValue(name, inputValue);
  }

  return (
    <div className="input-wrapper">
      <input
        type={type}
        className="common-input"
        id={id}
        name={name}
        placeholder={label}
        onChange={onChangeField}
      />
    </div>
  );
};

export default Input;