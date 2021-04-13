import React, { ChangeEvent, CSSProperties, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  textLabel?: string;
  isHasLabel?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, isHasLabel, textLabel, name, type, value, style, onChange, ...args }, ref) => (
    <>
      {isHasLabel ? <label htmlFor={id}>{textLabel}</label> : ''}
      <input
        id={id}
        name={name}
        type={type}
        style={{ ...style }}
        value={value}
        onChange={onChange}
        ref={ref}
        {...args}
      />
    </>
  )
);
Input.defaultProps = {
  onChange: () => {},
  style: {},
  isHasLabel: false,
  className: '',
  textLabel: '',
  type: 'text'
};

export default Input;
