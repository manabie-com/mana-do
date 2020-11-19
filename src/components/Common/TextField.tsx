import React from 'react';
import { ITextField } from '../../models/textField';

const TextField = ({ id, className, label, ...props }: ITextField) => {
  return (
    <label htmlFor={id}>
      <span className={className}>{label}</span>
      <input {...props} />
    </label>
  );
};
export default TextField;
