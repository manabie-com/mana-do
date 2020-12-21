import React, {forwardRef} from 'react';
import './style.scss';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string,
  helperText?: string,
  id?: string,
  name?: string,
  value?: string,
  type?: string,
  checked?: boolean
}

const TextField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {label, id, helperText, ...rest} = props;
  return (
    <label htmlFor={id} className='text-field__wrapper'>
      <span className='text-field__label'>{label}</span>
      <input className='text-field__input' id={id} ref={ref} {...rest}/>
      {helperText && <span className='text-field__helper'>{helperText}</span>}
    </label>
  );
});

export default TextField;