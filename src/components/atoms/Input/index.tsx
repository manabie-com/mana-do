import React from 'react';

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void;
  onKeyDown?: ((e: React.KeyboardEvent<HTMLInputElement>) => void);
  onBlur?:  ((event: React.FocusEvent<HTMLInputElement>) => void);
  value?: string;
  className?: string;
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  forwardedRef?: React.RefObject<HTMLInputElement>;
  checked?: boolean;
  disabled?: boolean;
  defaultValue?:string;
  autoFocus?: boolean;
}

const Input =({ onChange, onKeyDown, onBlur, className, value, id, name, disabled,
                type, placeholder, defaultValue, forwardedRef, checked, autoFocus }:Props) => {
  return (  
    <input
      id={id}
      disabled={disabled}
      checked={checked}
      ref={forwardedRef}
      type={type}
      name={name}
      value={value}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}   
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      autoFocus={autoFocus} />
  )
}

export default Input;