import React from 'react';
import styles from './styles.module.scss';

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  value?: string,
  name?: string,
  type?: string,
  placeholder?: string,
  className?: string,
  id?: string,
  innerRef?: any
}

const Input = (props: InputProps) => {
  const {
    onChange, value, placeholder, className, type, name, innerRef, onKeyDown, id
  } = props;
  return (
    <input
      ref={innerRef}
      type={type}
      name={name}
      defaultValue={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`${styles.Input} ${className}`}
      id={id}
      placeholder={placeholder}
    />
  );
};

Input.defaultProps = {
  type: 'text',
  name: '',
  placeholder: '',
  className: '',
};

export default Input;
